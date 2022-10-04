import { Controller, Get } from "@nestjs/common";
import { EnglishPatchService } from "./english-patch.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EnglishPatchDto } from "./dto/english-patch.dto";

@ApiTags("Patch files")
@Controller("patch")
export class PatchController {

	constructor(private readonly englishPatchService: EnglishPatchService) {
	}

	@ApiOperation({ summary: "Get English patch files" })
	@ApiResponse({ status: 200, type: EnglishPatchDto })
	@Get("en")
	getEnglishPatch(): Promise<EnglishPatchDto | {}> {
		return this.englishPatchService.getPatch();
	}
}