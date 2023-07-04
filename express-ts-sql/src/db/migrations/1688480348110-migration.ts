import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1688480348110 implements MigrationInterface {
  name = 'Migration1688480348110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."dream_type_enum" AS ENUM('happy', 'sad', 'exciting', 'scary')`
    );
    await queryRunner.query(
      `CREATE TABLE "dream" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "title" text NOT NULL, "date" TIMESTAMP NOT NULL, "type" "public"."dream_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d12349ee35ed0f8338f4883e81d" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dream"`);
    await queryRunner.query(`DROP TYPE "public"."dream_type_enum"`);
  }
}
