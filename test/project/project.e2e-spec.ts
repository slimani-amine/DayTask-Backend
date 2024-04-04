import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "src/app.module";
import { CreateProjectDto } from "src/routes/projects/dto/create-project.dto";
import { UpdateProjectDto } from "src/routes/projects/dto/update-project.dto";
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from "test/utils/constants";

describe("ProjectsController (e2e)", () => {
  let app: INestApplication;
  let apiToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const appUrl = APP_URL;
    const adminEmail = ADMIN_EMAIL;
    const adminPassword = ADMIN_PASSWORD;

    await request(appUrl)
      .post("/api/v1/auth/email/login")
      .send({ email: adminEmail, password: adminPassword })
      .then(({ body }) => {
        apiToken = body.token;
      });
  });

  const projectData: CreateProjectDto = {
    title: "Test Project",
    description: "This is a test project",
    members: [{ id: 1 }, { id: 2 }],
    due_date: "2024-04-05T14:30:00Z",
  };

  let projectId: number;

  it("should create a project", async () => {
    const res = await request(app.getHttpServer())
      .post("/projects")
      .send(projectData)
      .set("Authorization", apiToken)
      .expect(201);

    projectId = res.body.id;
  });

  it("should find all projects", async () => {
    await request(app.getHttpServer()).get("/projects").expect(200);
  });

  it("should find a specific project", async () => {
    await request(app.getHttpServer())
      .get(`/projects/${projectId}`)
      .set("Authorization", apiToken)
      .expect(200);
  });

  it("should update a project", async () => {
    const updateData: UpdateProjectDto = {
      title: "Updated Test Project",
      description: "This is an updated test project",
      members: [{ id: 1 }, { id: 3 }],
      due_date: "2024-04-06T14:30:00Z",
    };

    await request(app.getHttpServer())
      .patch(`/projects/${projectId}`)
      .send(updateData)
      .set("Authorization", apiToken)
      .expect(200);
  });

  it("should delete a project", async () => {
    await request(app.getHttpServer())
      .delete(`/projects/${projectId}`)
      .set("Authorization", apiToken)
      .expect(200);
  });
});
