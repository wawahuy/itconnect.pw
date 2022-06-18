import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1655582462400 implements MigrationInterface {
    name = 'mg1655582462400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company_info_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`addressStreet\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`companyName\` varchar(255) NOT NULL, \`dayEstablish\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`addressProvinceId\` int NULL, \`addressDistrictId\` int NULL, \`addressVillageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`companyInfoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD UNIQUE INDEX \`IDX_5e96f265469267c6c27191b687\` (\`companyInfoId\`)`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` DROP FOREIGN KEY \`FK_0dec14fd40d546fdb101fb8408b\``);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` CHANGE \`userSkillsId\` \`userSkillsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_401509d24b0d71b01a0a0b98756\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_10b2a273ef381e46ae6fc67aa46\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`skillId\` \`skillId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`parentId\` \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_165d4ff9dcabc15def46ffa8c20\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_0d66f3e9f22d5e62be548a6f02b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_1b8bcad73a6becddb565dc4efd7\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressProvinceId\` \`addressProvinceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressDistrictId\` \`addressDistrictId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressVillageId\` \`addressVillageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_0934e734a3f97d37788198f296c\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`userInfoId\` \`userInfoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` DROP FOREIGN KEY \`FK_f6235c0a767743f986d9cdffe3b\``);
        await queryRunner.query(`ALTER TABLE \`position_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` CHANGE \`userPositionsId\` \`userPositionsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_4bb7b007ab6347dad742d533715\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_8f6fff6b2239738702560ddb52b\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`positionId\` \`positionId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5e96f265469267c6c27191b687\` ON \`user_entity\` (\`companyInfoId\`)`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` ADD CONSTRAINT \`FK_0dec14fd40d546fdb101fb8408b\` FOREIGN KEY (\`userSkillsId\`) REFERENCES \`user_skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_401509d24b0d71b01a0a0b98756\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_10b2a273ef381e46ae6fc67aa46\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_165d4ff9dcabc15def46ffa8c20\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_0d66f3e9f22d5e62be548a6f02b\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_1b8bcad73a6becddb565dc4efd7\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_0934e734a3f97d37788198f296c\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_5e96f265469267c6c27191b6877\` FOREIGN KEY (\`companyInfoId\`) REFERENCES \`company_info_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_5e416a6fdc03f66de9b51d6e96a\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_a30325f01e55247deb78498649a\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_e23e7775e939d1ae14b4e7ee473\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` ADD CONSTRAINT \`FK_f6235c0a767743f986d9cdffe3b\` FOREIGN KEY (\`userPositionsId\`) REFERENCES \`user_position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_4bb7b007ab6347dad742d533715\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_8f6fff6b2239738702560ddb52b\` FOREIGN KEY (\`positionId\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_8f6fff6b2239738702560ddb52b\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_4bb7b007ab6347dad742d533715\``);
        await queryRunner.query(`ALTER TABLE \`position_entity\` DROP FOREIGN KEY \`FK_f6235c0a767743f986d9cdffe3b\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_e23e7775e939d1ae14b4e7ee473\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_a30325f01e55247deb78498649a\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_5e416a6fdc03f66de9b51d6e96a\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_5e96f265469267c6c27191b6877\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_0934e734a3f97d37788198f296c\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_1b8bcad73a6becddb565dc4efd7\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_0d66f3e9f22d5e62be548a6f02b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_165d4ff9dcabc15def46ffa8c20\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_10b2a273ef381e46ae6fc67aa46\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_401509d24b0d71b01a0a0b98756\``);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` DROP FOREIGN KEY \`FK_0dec14fd40d546fdb101fb8408b\``);
        await queryRunner.query(`DROP INDEX \`REL_5e96f265469267c6c27191b687\` ON \`user_entity\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`positionId\` \`positionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_8f6fff6b2239738702560ddb52b\` FOREIGN KEY (\`positionId\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_4bb7b007ab6347dad742d533715\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` CHANGE \`userPositionsId\` \`userPositionsId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` ADD CONSTRAINT \`FK_f6235c0a767743f986d9cdffe3b\` FOREIGN KEY (\`userPositionsId\`) REFERENCES \`user_position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`userInfoId\` \`userInfoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_0934e734a3f97d37788198f296c\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressVillageId\` \`addressVillageId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressDistrictId\` \`addressDistrictId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressProvinceId\` \`addressProvinceId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_1b8bcad73a6becddb565dc4efd7\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_0d66f3e9f22d5e62be548a6f02b\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_165d4ff9dcabc15def46ffa8c20\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`parentId\` \`parentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`skillId\` \`skillId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_10b2a273ef381e46ae6fc67aa46\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_401509d24b0d71b01a0a0b98756\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` CHANGE \`userSkillsId\` \`userSkillsId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` ADD CONSTRAINT \`FK_0dec14fd40d546fdb101fb8408b\` FOREIGN KEY (\`userSkillsId\`) REFERENCES \`user_skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP INDEX \`IDX_5e96f265469267c6c27191b687\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`companyInfoId\``);
        await queryRunner.query(`DROP TABLE \`company_info_entity\``);
    }

}
