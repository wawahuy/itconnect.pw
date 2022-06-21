import {ConflictException, ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {CreateOrEditUserPositionDto} from "../dtos/user-position.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserPositionEntity} from "../entities/userPosition.entity";
import {Repository} from "typeorm";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";

@Injectable({ scope: Scope.REQUEST })
export class UserPositionService {

    constructor(
        @InjectRepository(UserPositionEntity)
        private userPositionEntity: Repository<UserPositionEntity>,
        @Inject(REQUEST) private request: Request
    ) {
    }

    getAll() {
        return this.userPositionEntity.find({
            relations: ['position']
        });
    }

    async createOrEdit(dto: CreateOrEditUserPositionDto) {
        const currentUser = this.request['user'] as UserEntity;
        let upId = dto.id;

        if (dto.id) {
            const data = await this.userPositionEntity.findOne({
                where: {
                    id: dto.id,
                    user: {
                        id: currentUser.id
                    }
                },
                loadRelationIds: true
            });
            if (data) {
                const userPosition = await this.userPositionEntity.update(
                    { id: dto.id },
                    {
                        level: dto.level
                    }
                )
            } else {
                throw new ForbiddenException();
            }
        } else {
            const exists = await this.userPositionEntity.findOne({
                where: {
                    user: {
                        id: currentUser.id
                    },
                    position: {
                        id: dto.position
                    }
                },
                relations: ['position']
            })
            if (exists) {
                throw new ConflictException(`${exists.position.name} đã tồn tại`);
            }
            const r = await this.userPositionEntity.save([
                {
                    level: dto.level,
                    user: currentUser,
                    position: {
                        id: dto.position
                    }
                }
            ])
            upId = r[0].id;
        }

        return await this.userPositionEntity.findOne({
            where: { id: upId },
            relations: ['position']
        })
    }

    async delete(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        const exists = await this.userPositionEntity.findOne({
            where: {
                user: { id: currentUser.id },
                id
            }
        })
        if (exists) {
            return await this.userPositionEntity.delete(id);
        }

        throw new ForbiddenException();
    }
}