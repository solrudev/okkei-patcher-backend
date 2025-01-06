import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LegacyEnglishPatchDto } from "@legacy/patch/dto";
import { LegacyEnglishPatchService } from "@legacy/patch/legacy-english-patch.service";

@ApiTags("Patch files (legacy)")
@Controller({
	path: "patch",
	version: VERSION_NEUTRAL
})
export class LegacyPatchController {

	constructor(private readonly englishPatchService: LegacyEnglishPatchService) {
	}

	@ApiOperation({ summary: "Get English patch files" })
	@ApiResponse({ status: 200, type: LegacyEnglishPatchDto })
	@Get("en")
	getEnglishPatch(): Promise<LegacyEnglishPatchDto | {}> {
		return this.englishPatchService.getPatch();
	}
}