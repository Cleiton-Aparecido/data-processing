import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { userEntity } from "src/typeorm/entities/users.entity";
import { DataSource } from "typeorm";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let dataSource: DataSource;

  const user = {
    username: "testuser",
    password: "StrongP@ss123",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    dataSource = app.get(DataSource);
    await dataSource
      .getRepository(userEntity)
      .delete({ username: user.username });
  });

  afterAll(async () => {
    await dataSource
      .getRepository(userEntity)
      .delete({ username: user.username });

    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }

    await app.close();
  });

  it("/auth/register (POST) - deve registrar um novo usuário", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/register")
      .send(user)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username", user.username);
    expect(response.body).toHaveProperty("isActive", true);
    return response;
  });

  it("/auth/register (POST) - deve falhar ao registrar usuário já existente", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/register")
      .send(user)
      .expect(401);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Usuário ja cadastrado",
        error: "Unauthorized",
        statusCode: 401,
      })
    );
  });

  it("/auth/login (POST) - deve autenticar usuário válido", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send(user)
      .expect(201);

    expect(response.body).toHaveProperty("access_token");
    expect(typeof response.body.access_token).toBe("string");
  });

  it("/auth/login (POST) - deve falhar com senha errada", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ ...user, password: "senhaErrada" })
      .expect(401);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Usuário ou senha inválidos",
        error: "Unauthorized",
        statusCode: 401,
      })
    );
  });
});
