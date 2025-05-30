import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Data Processing API")
    .setDescription("Documentação da API de processamento de dados")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    customCssUrl: "/public/swagger-dark.css",
    customSiteTitle: "API Docs - Dark Mode",
  });

  //   SwaggerModule.setup("api", app, document, {
  //     swaggerOptions: {
  //       theme: "dark",
  //     },
  //     customSiteTitle: "Documentação API",
  //   });
}
