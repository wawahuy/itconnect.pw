import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {AddressEntity} from "./address.entity";


@Entity()
export class CompanyInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity, user => user.companyInfo)
    @JoinColumn()
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

    @Column()
    phone: string;

    @Column()
    companyName: string;

    @Column()
    dayEstablish: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}