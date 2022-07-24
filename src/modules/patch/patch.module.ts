import { Module } from "@nestjs/common";
import { EnglishPatchService } from "./english-patch.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnglishPatchFile } from "../../entities/english-patch-file.entity";
import { PatchController } from "./patch.controller";

@Module({
	providers: [EnglishPatchService],
	controllers: [PatchController],
	imports: [
		TypeOrmModule.forFeature([EnglishPatchFile])
	]
})
export class PatchModule {
}