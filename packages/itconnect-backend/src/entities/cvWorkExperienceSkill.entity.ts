import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {SkillEntity} from "./skill.entity";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";
import {UserSkillEntity} from "./userSkill.entity";

export const MAX_WORK_EXPERIENCE_SKILL = 20;
export const MIN_WORK_EXPERIENCE_SKILL = 1;

@Entity()
export class CvWorkExperienceSkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => CvWorkExperienceEntity)
    cvWorkExperience: CvWorkExperienceEntity;

    @ManyToOne(type => UserSkillEntity)
    userSkill: UserSkillEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}