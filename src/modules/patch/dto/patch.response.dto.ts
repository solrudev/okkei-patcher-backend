import { ApiProperty } from "@nestjs/swagger";
import { PatchFileDto } from "./patch-file.dto";

export class PatchResponseDto {

	@ApiProperty({
		example: "1.0",
		description: "Display version of patch"
	})
	readonly displayVersion: string;

	@ApiProperty({
		type: PatchFileDto,
		isArray: true
	})
	readonly apk: PatchFileDto[];

	@ApiProperty({
		type: PatchFileDto,
		isArray: true
	})
	readonly obb: PatchFileDto[];
}