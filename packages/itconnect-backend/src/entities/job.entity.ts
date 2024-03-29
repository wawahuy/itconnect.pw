import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity, Index,
    JoinColumn,
    ManyToOne, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {AddressEntity} from "./address.entity";
import {JobLevelEntity} from "./jobLevel.entity";
import {CompanyTagEntity} from "./companyTag.entity";
import {PositionEntity} from "./position.entity";
import {JobPositionDto} from "../dtos/job.dto";
import {JobPositionEntity} from "./jobPosition.entity";
import {JobSkillEntity} from "./jobSkill.entity";
import {JobCertificateEntity} from "./jobCertificate.entity";
import {JobSchoolEntity} from "./jobSchool.entity";
import {JobWorkFromEntity} from "./jobWorkFrom.entity";
import {JobJobLevelEntity} from "./jobJobLevel.entity";
import {JobTypeEntity} from "./jobType.entity";
import {JobApplyEntity} from "./jobApply.entity";
import {JobSavedEntity} from "./jobSaved.entity";
import {JobViewLogEntity} from "./jobViewLog.entity";

export enum JobStatus {
    Draft = 1,
    WaitApprove = 2,
    WaitSystem = 3,
    Publish = 4,
    Ban = 5
}

@Entity()
export class JobEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => AddressEntity)
    @JoinColumn()
    addressProvince: AddressEntity;

    @ManyToOne(type => AddressEntity)
    @JoinColumn()
    addressDistrict: AddressEntity;

    @ManyToOne(type => AddressEntity)
    @JoinColumn()
    addressVillage: AddressEntity;

    @Column()
    addressStreet: string;

    @Column({ nullable: true })
    size: number;

    @OneToMany(type => JobPositionEntity, db => db.job)
    jobPositions: JobPositionEntity[];

    @OneToMany(type => JobSkillEntity, db => db.job)
    jobSkills: JobSkillEntity[];

    @OneToMany(type => JobCertificateEntity, db => db.job)
    jobCertificates: JobCertificateEntity[];

    @OneToMany(type => JobSchoolEntity, db => db.job)
    jobSchools: JobSchoolEntity[];

    @OneToMany(type => JobWorkFromEntity, db => db.job)
    jobWorkFrom: JobWorkFromEntity[];

    @OneToMany(type => JobJobLevelEntity, db => db.job)
    jobJobLevels: JobJobLevelEntity[];

    @OneToMany(type => JobApplyEntity, db => db.job)
    jobApply: JobApplyEntity[];
    jobApplyCount: number;
    jobApplySelf: number;

    @OneToMany(type => JobSavedEntity, db => db.job)
    jobSaved: JobSavedEntity[];
    jobSavedSelf: number;

    @OneToMany(type => JobViewLogEntity, db => db.job)
    jobViewLogs: JobViewLogEntity[];
    jobViewLogCount: number;

    @OneToMany(type => JobViewLogEntity, db => db.job)
    jobUniqueViewLogs: JobViewLogEntity[];
    jobUniqueViewLogCount: number;

    @ManyToOne(type => JobTypeEntity)
    jobType: JobTypeEntity;

    @ManyToOne(type => CompanyTagEntity)
    companyTag: CompanyTagEntity;

    @Column({ nullable: true })
    @Index()
    salaryMin: number;

    @Column({ nullable: true })
    @Index()
    salaryMax: number;

    @Column({ nullable: true })
    @Index()
    yoe: number;

    @Column()
    // @Index({ fulltext: true })
    name: string;

    @Column()
    @Index()
    endDate: Date;

    @Column({ type: 'text' })
    descriptionContent: string;

    @Column({ type: 'text' })
    requirementContent: string;

    @Column({ type: 'text', nullable: true })
    reasonContent: string;

    @Column()
    @Index()
    status: JobStatus;

    @Column()
    pointSkill: number;

    @Column()
    pointPosition: number;

    @Column()
    pointCertificate: number;

    @Column()
    pointSchool: number;

    @Column()
    pointWorkFrom: number;

    @Column()
    pointLevelJob: number;

    @Column()
    pointLevelType: number;

    @Column()
    pointYoe: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}