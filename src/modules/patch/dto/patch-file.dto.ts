import { ApiProperty } from "@nestjs/swagger";
import { PatchFileType } from "@patch/interfaces";
import { FileDto } from "@shared/dto";

export class PatchFileDto extends FileDto {

	@ApiProperty()
	readonly type: PatchFileType;
}