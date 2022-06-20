import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {SkillEntity} from "./skill.entity";
import {CvWorkExperiencePositionEntity} from "./cvWorkExperiencePosition.entity";
import {PositionEntity} from "./position.entity";
import {CvWorkExperienceSkillEntity} from "./cvWorkExperienceSkill.entity";

export const MAX_USER_SKILL = 20;
export const MIN_USER_SKILL = 3;

@Entity()
export class UserSkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 1 })
    level: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => SkillEntity)
    skill!: SkillEntity;

    @OneToMany(type => CvWorkExperienceSkillEntity, db => db.userSkill)
    cvWorkExperienceSkills: CvWorkExperienceSkillEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}