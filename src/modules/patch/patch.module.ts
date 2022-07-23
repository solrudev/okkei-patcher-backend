import { Module } from "@nestjs/common";
import { EnglishPatchService } from "./english-patch.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnglishPatch } from "../../entities/english-patch.entity";
import { PatchController } from "./patch.controller";

@Module({
	providers: [EnglishPatchService],
	controllers: [PatchController],
	imports: [
		TypeOrmModule.forFeature([EnglishPatch])
	]
})
export class PatchModule {
}