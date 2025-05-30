import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Data Processing API")
    .setDescription("Documentação da API de processamento de dados")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme();
  const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DARK);

  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: darkStyle,
    customSiteTitle: "API Docs - Dark Mode",
  });
}
