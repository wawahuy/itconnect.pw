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
export class UserInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity, user => user.userInfo)
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
    fullName: string;

    @Column()
    birthday: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}