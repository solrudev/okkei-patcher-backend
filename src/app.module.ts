import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { File } from "./entities/file.entity";
import { EnglishPatchFile } from "./entities/english-patch-file.entity";
import { PatcherVersion } from "./entities/patcher-version.entity";
import { PatcherChange } from "./entities/patcher-change.entity";
import { PatchModule } from "./modules/patch/patch.module";
import { PatcherModule } from "./modules/patcher/patcher.module";
import { PatchVersion } from "./entities/patch-version.entity";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => {
				let sslOptions = {};
				if (process.env.NODE_ENV == "production") {
					sslOptions = {
						ssl: { rejectUnauthorized: false }
					};
				}
				return {
					type: "postgres",
					url: process.env.DATABASE_URL,
					...sslOptions,
					entities: [
						File,
						EnglishPatchFile,
						PatchVersion,
						PatcherVersion,
						PatcherChange
					],
					synchronize: process.env.NODE_ENV == "development"
				};
			}
		}),
		PatchModule,
		PatcherModule
	]
})
export class AppModule {
}