import {ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {CreateOrEditCvWorkExperienceDto} from "../dtos/cv-work-experience.dto";
import {UserEntity} from "../entities/user.entity";
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {DeepPartial, Repository} from "typeorm";
import {CvCertificateEntity} from "../entities/cvCertificate.entity";
import {CertificateService} from "./certificate.service";
import {CreateOrEditCvCertificateDto} from "../dtos/cv-certificate.dto";
import {UserCertificateService} from "./user-certificate.service";

@Injectable({ scope: Scope.REQUEST })
export class CvCertificateService {

    constructor(
        @InjectRepository(CvCertificateEntity)
        private cvCertificateRepository: Repository<CvCertificateEntity>,
        @Inject(REQUEST) private request: Request,
        private userCertificateService: UserCertificateService,
        private certificateService: CertificateService
    ) {
    }

    isOwner(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvCertificateRepository.findOne({
            where: {
                id,
                user: { id: currentUser.id }
            }
        })
    }

    getOwner() {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvCertificateRepository.find({
            where: {
                user: { id: currentUser.id }
            },
            order: {
                year: 'DESC'
            },
            relations: [
                'certificate'
            ]
        })
    }

    async createOrEdit(data: CreateOrEditCvCertificateDto) {
        const currentUser = this.request['user'] as UserEntity;
        let upId = data.id;

        const dataUpdate: DeepPartial<CvCertificateEntity> = {
            year: data.year,
            certificate: { id: data.certificate },
            content: data.content,
        };

        // if (data.certificate) {
        //     const tGlobal = await this.certificateService.isApprove(data.certificate);
        //     if (!tGlobal) {
        //         const tOwner = await this.certificateService.isOwner(data.certificate);
        //         if (!tOwner) {
        //             throw new ForbiddenException();
        //         }
        //     }
        // }

        if (data.id) {
            const cv = await this.cvCertificateRepository.findOne({
                where: {
                    user: { id: currentUser.id },
                    id: upId
                }
            })
            if (!cv) {
                throw new ForbiddenException();
            }
            await this.cvCertificateRepository.update(
                { id: upId },
                dataUpdate
            );
        } else {
            const cv = await this.cvCertificateRepository.save([
                {...dataUpdate, user: { id: currentUser.id } }
            ]);

            // insert user certificate
            try {
                await this.userCertificateService.createOrEdit({
                    certificate: data.certificate,
                    level: 1,
                    id: 0
                })
            } catch (e) {
                console.log(e);
            }

            upId = cv[0].id;
        }

        return this.cvCertificateRepository.findOne({
            where: {
                id: upId
            },
            relations: [
                'certificate'
            ]
        })
    }

    async delete(id: number) {
        const owner = await this.isOwner(id);
        if (owner) {
            // remove user certificate
            try {
                const userCert = await this.userCertificateService.getByCertificateId(owner.certificate.id);
                if (userCert) {
                    await this.userCertificateService.delete(userCert.id)
                }
            } catch (e) {
                console.log(e);
            }

            return this.cvCertificateRepository.remove(owner);
        }
        throw new ForbiddenException();
    }
}
