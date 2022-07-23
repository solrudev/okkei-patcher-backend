import { Controller, Get, Query, Req } from "@nestjs/common";
import { PatcherService } from "./patcher.service";
import { Request } from "express";
import { Language, languageFromString } from "../../interfaces/language.interface";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileDto } from "../../dto/file.dto";
import { VersionDto } from "./dto/version.dto";

@ApiTags("Okkei Patcher app")
@Controller("app")
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
		@Query("version") version: number = 1,
		@Req() request: Request
	): Promise<VersionDto[]> {
		const language = request
			.acceptsLanguages()
			.map(languageFromString)
			.filter((language): language is Language => language != null)
			[0] ?? Language.ENGLISH;
		return this.patcherService.getChangesSinceVersion(version, language);
	}
}