import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PatchFileDto } from "@patch/dto";

async function bootstrap() {
	const port = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	app.enableVersioning();
	const config = new DocumentBuilder()
		.setTitle("Okkei Patcher API")
		.setDescription("API documentation")
		.setVersion("1.0.0")
		.build();
	const document = SwaggerModule.createDocument(app, config, {
		extraModels: [PatchFileDto]
	});
	SwaggerModule.setup("api/docs", app, document);
	await app.listen(
		port,
		() => console.log(`Server started on port ${port}`)
	);
}

bootstrap();