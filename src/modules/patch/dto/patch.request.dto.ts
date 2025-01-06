import { ApiProperty } from "@nestjs/swagger";
import { SupportedFeaturesDto } from "./supported-features.dto";

export class PatchRequestDto {

	@ApiProperty()
	readonly supportedFeatures: SupportedFeaturesDto;
}