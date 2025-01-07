import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { PatchFileType } from "@patch/interfaces";
import { FileDto } from "@shared/dto";

export class PatchFileDto extends FileDto {

	@ApiProperty({
		description: "Type of patch file",
		example: PatchFileType.OBB_PATCH,
		enum: PatchFileType,
		enumName: "PatchFileType"
	})
	readonly type: PatchFileType;

	@ApiProperty({
		description: "Patch target file size after applying the patch file, -1 if unknown",
		example: 1786991864
	})
	readonly patchedSize: number
}