import { ApiProperty } from "@nestjs/swagger";
import { SupportedFeaturesDto } from "./supported-features.dto";

export class PatchRequestDto {

	@ApiProperty({
		example: 100,
		description: "Version code of the game to be patched"
	})
	readonly gameVersion?: number;

	@ApiProperty({
		description: "Features supported by the patcher app"
	})
	readonly supportedFeatures: SupportedFeaturesDto;
}