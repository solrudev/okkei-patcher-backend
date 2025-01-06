import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnglishPatchFile, PatchVersion } from "@patch/entities";
import { LegacyPatchModule } from "@legacy/patch/legacy-patch.module";
import { PatchController } from "@patch/patch.controller";
import { EnglishPatchService } from "@patch/english-patch.service";

@Module({
	providers: [EnglishPatchService],
	controllers: [PatchController],
	imports: [
		TypeOrmModule.forFeature([PatchVersion, EnglishPatchFile]),
		LegacyPatchModule
	]
})
export class PatchModule {
}