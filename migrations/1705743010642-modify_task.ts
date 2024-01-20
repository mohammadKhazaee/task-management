import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyTask1705743010642 implements MigrationInterface {
  name = 'ModifyTask1705743010642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`name\` \`title\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`title\` \`name\` varchar(255) NOT NULL`,
    );
  }
}
