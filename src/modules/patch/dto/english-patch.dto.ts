import { ApiProperty } from "@nestjs/swagger";
import { FileDto } from "../../../dto/file.dto";

export class EnglishPatchDto {

	@ApiProperty({
		example: "1.0",
		description: "Display version of patch"
	})
	displayVersion: string;

	@ApiProperty()
	scripts: FileDto;

	@ApiProperty()
	obb: FileDto;
}