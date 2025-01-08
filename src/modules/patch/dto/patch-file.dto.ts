import { ApiProperty } from "@nestjs/swagger";
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
	readonly patchedSize: number;

	@ApiProperty({
		description: "Hashes of patch target file which are compatible with the patch file, empty if unknown",
		example: ["bb8a0f28bbe1692d5d1f975e603bc71130c79c1b64c99b67590b297537b5c62a"]
	})
	readonly compatibleHashes: string[];

	@ApiProperty({
		description: "Patch target file version required for the patch, 1 is unpatched",
		example: 1
	})
	readonly targetVersion: number;
}