import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PatchRequestDto, PatchResponseDto } from "@patch/dto";
import { EnglishPatchService } from "@patch/english-patch.service";

@ApiTags("Patch files")
@Controller({
	path: "patch",
	version: "1"
})
export class PatchController {

	constructor(private readonly englishPatchService: EnglishPatchService) {
	}

	@ApiOperation({ summary: "Get English patch files" })
	@ApiResponse({ status: 200, type: PatchResponseDto })
	@Post("en")
	getEnglishPatch(@Body() patchRequestDto: PatchRequestDto): Promise<PatchResponseDto> {
		return this.englishPatchService.getPatch(patchRequestDto.supportedFeatures);
	}
}