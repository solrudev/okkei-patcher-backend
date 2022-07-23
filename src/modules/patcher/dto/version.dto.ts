import { ApiProperty } from "@nestjs/swagger";

export class VersionDto {

	@ApiProperty({
		example: "2.0.0",
		description: "Okkei Patcher version name"
	})
	versionName: string;

	@ApiProperty({
		example: ["Bug fix: crash", "Bug fix: crash"],
		description: "Okkei Patcher version changes"
	})
	changes: string[];
}