import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserSkillEntity} from "./userSkill.entity";

export const MAX_SKILL_NAME_LENGTH = 20;
export const MIN_SKILL_NAME_LENGTH = 1;

@Entity()
export class SkillEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @OneToMany(type => UserSkillEntity, db => db.skill)
    userSkills: UserSkillEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}