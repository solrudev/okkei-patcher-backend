import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { PatchFileType } from "@patch/interfaces";
import { FileDto } from "@shared/dto";

export class PatchFileDto extends FileDto {

	@ApiProperty({
		example: PatchFileType.OBB_PATCH,
		enum: PatchFileType,
		enumName: "PatchFileType"
	})
	readonly type: PatchFileType;
}