import { Module } from "@nestjs/common";
import { EnglishPatchService } from "./english-patch.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnglishPatchFile } from "../../entities/english-patch-file.entity";
import { PatchController } from "./patch.controller";
import { PatchVersion } from "../../entities/patch-version.entity";

@Module({
	providers: [EnglishPatchService],
	controllers: [PatchController],
	imports: [
		TypeOrmModule.forFeature([PatchVersion, EnglishPatchFile])
	]
})
export class PatchModule {
}