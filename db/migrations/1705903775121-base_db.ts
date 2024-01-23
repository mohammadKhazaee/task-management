import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseDb1705903775121 implements MigrationInterface {
  name = 'BaseDb1705903775121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`task\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`priority\` varchar(255) NOT NULL, \`fileUrl\` varchar(255) NOT NULL DEFAULT '', \`imageUrl\` varchar(255) NOT NULL DEFAULT '', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permission\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_240853a0c3353c25fb12434ad3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_permissions_permission\` (\`roleId\` varchar(36) NOT NULL, \`permissionId\` varchar(36) NOT NULL, INDEX \`IDX_e40a06a476ba12ba906844e9ac\` (\`roleId\`), INDEX \`IDX_67c43b2367c014857f8068067d\` (\`permissionId\`), PRIMARY KEY (\`roleId\`, \`permissionId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles_role\` (\`userId\` varchar(36) NOT NULL, \`roleId\` varchar(36) NOT NULL, INDEX \`IDX_5f9286e6c25594c6b88c108db7\` (\`userId\`), INDEX \`IDX_4be2f7adf862634f5f803d246b\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD CONSTRAINT \`FK_f316d3fe53497d4d8a2957db8b9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions_permission\` ADD CONSTRAINT \`FK_e40a06a476ba12ba906844e9ac4\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions_permission\` ADD CONSTRAINT \`FK_67c43b2367c014857f8068067d6\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_5f9286e6c25594c6b88c108db77\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_4be2f7adf862634f5f803d246b8\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_4be2f7adf862634f5f803d246b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_5f9286e6c25594c6b88c108db77\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions_permission\` DROP FOREIGN KEY \`FK_67c43b2367c014857f8068067d6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions_permission\` DROP FOREIGN KEY \`FK_e40a06a476ba12ba906844e9ac4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_f316d3fe53497d4d8a2957db8b9\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4be2f7adf862634f5f803d246b\` ON \`user_roles_role\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5f9286e6c25594c6b88c108db7\` ON \`user_roles_role\``,
    );
    await queryRunner.query(`DROP TABLE \`user_roles_role\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_67c43b2367c014857f8068067d\` ON \`role_permissions_permission\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e40a06a476ba12ba906844e9ac\` ON \`role_permissions_permission\``,
    );
    await queryRunner.query(`DROP TABLE \`role_permissions_permission\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_240853a0c3353c25fb12434ad3\` ON \`permission\``,
    );
    await queryRunner.query(`DROP TABLE \`permission\``);
    await queryRunner.query(`DROP TABLE \`task\``);
  }
}
