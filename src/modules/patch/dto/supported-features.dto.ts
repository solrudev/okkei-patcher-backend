import { ApiProperty } from "@nestjs/swagger";

export class SupportedFeaturesDto {

	@ApiProperty({
		example: true,
		description: "Denotes that requesting patcher app supports patching game scripts"
	})
	readonly scripts: boolean;

	@ApiProperty({
		example: true,
		description: "Denotes that requesting patcher app supports binary file patches"
	})
	readonly binaryPatches: boolean;
}