import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { JwtService } from "@nestjs/jwt";

describe("ClientController (e2e)", () => {
  let app: INestApplication;
  let jwtToken: string;
  let createdClientId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    );
    await app.init();

    const jwtService = moduleFixture.get(JwtService);
    jwtToken = jwtService.sign({ sub: 1, username: "admin" });
  });

  it("POST /client/createClient - deve criar um cliente", async () => {
    const response = await request(app.getHttpServer())
      .post("/client/createClient")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send({
        name: "Pedro Costa",
        email: "pedro.costa@email.com",
        telephone: "11977777777",
        cpf: "12345951900",
        rg: "RJ1111222",
        father: "Marcos Costa",
        mother: "Julia Costa",
      })
      .expect(201);

    expect(response.body).toHaveProperty("id");
    createdClientId = response.body.id;
  });

  it("GET /client/getClient - deve buscar um cliente", async () => {
    const response = await request(app.getHttpServer())
      .get("/client/getClient")
      .set("Authorization", `Bearer ${jwtToken}`)
      .query({ cpf: "12345951900" })
      .expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body.cpf).toBe("12345951900");
  });

  //   it("PUT /client/updateClient/:id - deve atualizar o cliente", async () => {
  //     const response = await request(app.getHttpServer())
  //       .put(`/client/updateClient/3`)
  //       .set("Authorization", `Bearer ${jwtToken}`)
  //       .send({
  //         name: "Pedro Atualizado",
  //         email: "pedro.atualizado@email.com",
  //         telephone: "11999999999",
  //         cpf: "12345951900",
  //         rg: "RJ1111222",
  //         father: "Marcos Costa",
  //         mother: "Julia Costa",
  //         address: "Rua Nova, 123",
  //       })
  //       .expect(200);

  //     expect(response.body.name).toBe("Pedro Atualizado");
  //     expect(response.body.address).toBe("Rua Nova, 123");
  //   });

  it("DELETE /client/:id - deve deletar o cliente", async () => {
    await request(app.getHttpServer())
      .delete(`/client/${createdClientId}`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
