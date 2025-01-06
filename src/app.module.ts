import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { File } from "@shared/entities";
import { LegacyEnglishPatchFile } from "@legacy/patch/entities";
import { EnglishPatchFile, PatchVersion } from "@patch/entities";
import { PatcherChange, PatcherVersion } from "@patcher/entities";
import { PatchModule } from "@patch/patch.module";
import { PatcherModule } from "@patcher/patcher.module";

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
						LegacyEnglishPatchFile,
						File,
						PatchVersion,
						PatcherVersion,
						PatcherChange,
						EnglishPatchFile
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