import { Controller, Get, Query, Req, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Language, languageFromString } from "@shared/interfaces";
import { VersionDto } from "@patcher/dto";
import { FileDto } from "@shared/dto";
import { PatcherService } from "@patcher/patcher.service";

@ApiTags("Okkei Patcher app")
@Controller({
	path: "app",
	version: [VERSION_NEUTRAL, "1"]
})
export class PatcherController {

	constructor(private readonly patcherService: PatcherService) {
	}

	@ApiOperation({ summary: "Get latest Okkei Patcher version data" })
	@ApiResponse({ status: 200, type: FileDto })
	@Get()
	getLatestVersion(): Promise<FileDto | null> {
		return this.patcherService.getLatestVersion();
	}

	@ApiOperation({ summary: "Get Okkei Patcher changelog starting with given version" })
	@ApiResponse({ status: 200, type: [VersionDto] })
	@Get("changelog")
	getChangelog(
		@Req() request: Request,
		@Query("version") version: number = 1
	): Promise<VersionDto[]> {
		const language = request
			.acceptsLanguages()
			.map(languageFromString)
			.filter((language): language is Language => language != null)
			[0] ?? Language.ENGLISH;
		return this.patcherService.getChangesSinceVersion(version, language);
	}
}