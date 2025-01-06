import { ApiProperty } from "@nestjs/swagger";
import { FileDto } from "@shared/dto";

export class LegacyEnglishPatchDto {

	@ApiProperty({
		example: "1.0",
		description: "Display version of patch"
	})
	readonly displayVersion: string;

	@ApiProperty()
	readonly scripts: FileDto;

	@ApiProperty()
	readonly obb: FileDto;
}