import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatcherVersion } from "../../entities/patcher-version.entity";
import { PatcherService } from "./patcher.service";
import { PatcherController } from "./patcher.controller";

@Module({
	providers: [PatcherService],
	controllers: [PatcherController],
	imports: [
		TypeOrmModule.forFeature([PatcherVersion])
	]
})
export class PatcherModule {
}