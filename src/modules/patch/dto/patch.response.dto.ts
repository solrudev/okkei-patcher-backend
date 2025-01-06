import { ApiProperty } from "@nestjs/swagger";
import { PatchFileDto } from "@patch/dto";

export class PatchResponseDto {

	@ApiProperty({
		example: "1.0",
		description: "Display version of patch"
	})
	readonly displayVersion: string;

	@ApiProperty({
		isArray: true
	})
	readonly apk: PatchFileDto[];

	@ApiProperty({
		isArray: true
	})
	readonly obb: PatchFileDto[];
}