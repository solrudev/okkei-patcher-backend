import { ApiProperty } from "@nestjs/swagger";

export class FileDto {

	@ApiProperty({
		example: 1,
		description: "File version"
	})
	readonly version: number;

	@ApiProperty({
		example: "https://example.com/file.ext",
		description: "File URL"
	})
	readonly url: string;

	@ApiProperty({
		example: "c94f794d56ab6b5ba817a7a2efcc3ea9e81893126f6a925963542aa8ad34f798",
		description: "File SHA-256 hash"
	})
	readonly hash: string;

	@ApiProperty({
		example: "164141",
		description: "File size in bytes"
	})
	readonly size: number;
}