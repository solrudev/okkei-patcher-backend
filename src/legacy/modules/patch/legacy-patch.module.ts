import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LegacyEnglishPatchFile } from "@legacy/patch/entities";
import { PatchVersion } from "@patch/entities";
import { LegacyEnglishPatchService } from "@legacy/patch/legacy-english-patch.service";
import { LegacyPatchController } from "@legacy/patch/legacy-patch.controller";

@Module({
	providers: [LegacyEnglishPatchService],
	controllers: [LegacyPatchController],
	imports: [
		TypeOrmModule.forFeature([PatchVersion, LegacyEnglishPatchFile])
	]
})
export class LegacyPatchModule {
}