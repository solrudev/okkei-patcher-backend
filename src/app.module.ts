import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { File } from "./entities/file.entity";
import { EnglishPatchFile } from "./entities/english-patch-file.entity";
import { PatcherVersion } from "./entities/patcher-version.entity";
import { PatcherChange } from "./entities/patcher-change.entity";
import { PatchModule } from "./modules/patch/patch.module";
import { PatcherModule } from "./modules/patcher/patcher.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			ssl: { rejectUnauthorized: false },
			entities: [
				File,
				EnglishPatchFile,
				PatcherVersion,
				PatcherChange
			],
			synchronize: Boolean(process.env.SYNCHRONIZE)
		}),
		PatchModule,
		PatcherModule
	]
})
export class AppModule {
}