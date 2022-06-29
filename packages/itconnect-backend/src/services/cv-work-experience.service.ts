import {ConflictException, ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {CreateOrEditCvWorkExperienceDto} from "../dtos/cv-work-experience.dto";
import {UserEntity} from "../entities/user.entity";
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {DeepPartial, LessThanOrEqual, MoreThanOrEqual, Not, Repository} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {CompanyTagService} from "./company-tag.service";
import {UserService} from "./user.service";
import * as moment from "moment";
import {Id} from "../utils/function";

@Injectable({ scope: Scope.REQUEST })
export class CvWorkExperienceService {

    constructor(
        @InjectRepository(CvWorkExperienceEntity)
        private cvWorkExperienceRepository: Repository<CvWorkExperienceEntity>,
        @Inject(REQUEST) private request: Request,
        private companyTagService: CompanyTagService,
        private userService: UserService
    ) {
    }

    isOwner(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvWorkExperienceRepository.findOne({
            where: {
                id,
                user: { id: currentUser.id }
            }
        })
    }

    getOwner() {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvWorkExperienceRepository.find({
            where: {
                user: { id: currentUser.id }
            },
            order: {
                startDate: 'DESC'
            },
            relations: [
                'companyTag',
                'jobLevel',
                'jobType',
                'workFrom',
                'cvWorkExperienceSkills',
                'cvWorkExperienceSkills.skill',
                'cvWorkExperiencePositions',
                'cvWorkExperiencePositions.position',
            ]
        })
    }

    async createOrEdit(data: CreateOrEditCvWorkExperienceDto) {
        const currentUser = this.request['user'] as UserEntity;
        let upId = data.id;

        const dataUpdate: DeepPartial<CvWorkExperienceEntity> = {
            startDate: moment(data.startDate).startOf('month').toDate(),
            endDate: data.endDate ? moment(data.endDate).startOf('month').toDate() : null,
            jobLevel: data.jobLevel ? { id: data.jobLevel } : null,
            jobType: data.jobType ? { id: data.jobType } : null,
            workFrom: data.workFrom ? { id: data.workFrom } : null,
            content: data.content,
        };

        // valid contain or overlap time
        const qr = this.cvWorkExperienceRepository.createQueryBuilder('cv');
        qr.where(`(
                (
                    (startDate <= :param_start_date and (endDate >= :param_start_date or endDate is null)) or
                    (startDate <= :param_end_date and (endDate >= :param_end_date or endDate is null))    
                ) 
                or startDate >= :param_start_date and (endDate <= :param_end_date or (endDate is null and :is_null_end_date = 1))
            )`, {
            param_end_date: dataUpdate.endDate || moment().startOf('month').toDate(),
            param_start_date: dataUpdate.startDate,
            is_null_end_date: !dataUpdate.endDate ? 1 : 0
        })
        qr.andWhere({
            user: Id(currentUser.id)
        })
        if (upId) {
            qr.andWhere({
                id: Not(upId)
            })
        }
        qr.leftJoinAndSelect('cv.companyTag', 'companyTag')
        const resultCvValid = await qr.getOne();
        if (resultCvValid) {
            let supportForce = false;
            if (!resultCvValid.endDate) {
                supportForce = moment(<any>resultCvValid.startDate).isBefore(
                    moment(<any>dataUpdate.startDate)
                )
            }
            if (!(!resultCvValid.endDate && data.force && supportForce)) {
                const s = moment(resultCvValid.startDate).startOf('month').format('MM/YYYY');
                const e = resultCvValid.endDate ? moment(resultCvValid.endDate).startOf('month').format('MM/YYYY') : 'hiện tại';
                throw new ConflictException(`Trùng lập công ty ${resultCvValid.companyTag.name} từ ${s} đến ${e} ${supportForce ? '___' : ''}`)
            }
        }
        // update old cv experience to prev current month
        if (resultCvValid) {
            await this.cvWorkExperienceRepository.update(
                { id: resultCvValid.id },
                {
                    endDate: moment(<any>dataUpdate.startDate).subtract(1, 'month').toDate()
                });
        }


        // check owner company tag
        if (data.companyTag) {
            const tGlobal = await this.companyTagService.isApprove(data.companyTag);
            if (!tGlobal) {
                const tOwner = await this.companyTagService.isOwner(data.companyTag);
                if (!tOwner) {
                    throw new ForbiddenException();
                }
            }
            dataUpdate.companyTag = { id: data.companyTag };
        }

        if (data.id) {
            const cv = await this.cvWorkExperienceRepository.findOne({
                where: {
                    user: { id: currentUser.id },
                    id: upId
                }
            })
            if (!cv) {
                throw new ForbiddenException();
            }
            await this.cvWorkExperienceRepository.update(
                { id: upId },
                dataUpdate
            );
        } else {
            const cv = await this.cvWorkExperienceRepository.save([
                {...dataUpdate, user: { id: currentUser.id } }
            ]);
            upId = cv[0].id;
        }

        // re-compute yoe
        await this.userService.computeYoE(currentUser.id);

        return this.cvWorkExperienceRepository.findOne({
            where: {
                id: upId
            },
            relations: [
                'companyTag',
                'jobLevel',
                'jobType',
                'workFrom',
                'cvWorkExperienceSkills',
                'cvWorkExperienceSkills.skill',
                'cvWorkExperiencePositions',
                'cvWorkExperiencePositions.position',
            ]
        })
    }

    async delete(id: number) {
        const owner = await this.isOwner(id);
        if (owner) {
            // soft delete
            // if force need remove all ...skill & ...position
            const result = await this.cvWorkExperienceRepository.softRemove(owner);

            // re-compute yoe
            const currentUser = this.request['user'] as UserEntity;
            await this.userService.computeYoE(currentUser.id);

            return result;
        }
        throw new ForbiddenException();
    }
}
