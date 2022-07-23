import { ApiProperty } from "@nestjs/swagger";
import { FileDto } from "../../../dto/file.dto";

export class EnglishPatchDto {

	@ApiProperty()
	scripts: FileDto;

	@ApiProperty()
	obb: FileDto;
}