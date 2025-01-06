import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatcherVersion } from "@patcher/entities";
import { PatcherService } from "@patcher/patcher.service";
import { PatcherController } from "@patcher/patcher.controller";

@Module({
	providers: [PatcherService],
	controllers: [PatcherController],
	imports: [
		TypeOrmModule.forFeature([PatcherVersion])
	]
})
export class PatcherModule {
}