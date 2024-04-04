import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "src/app.module";
import { CreateTaskDto } from "src/routes/tasks/dto/create-task.dto";
import { UpdateTaskDto } from "src/routes/tasks/dto/update-task.dto";

describe("TasksController (e2e)", () => {
  let app: INestApplication;

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

  const taskData: CreateTaskDto = {
    title: "Test Task",
    description: "This is a test task",
    projectId: 1,
    members: [{ id: 1 }, { id: 2 }],
    due_date: "2024-04-05T14:30:00Z",
    completed: false,
    completedAt: null,
    startedAt: null,
  };

  let taskId: number;

  it("should create a task", async () => {
    const res = await request(app.getHttpServer())
      .post("/tasks")
      .send(taskData)
      .expect(201);

    taskId = res.body.id;
  });

  it("should find all tasks", async () => {
    await request(app.getHttpServer()).get("/tasks").expect(200);
  });

  it("should find a specific task", async () => {
    await request(app.getHttpServer()).get(`/tasks/${taskId}`).expect(200);
  });

  it("should update a task", async () => {
    const updateData: UpdateTaskDto = {
      title: "Updated Test Task",
      description: "This is an updated test task",
      projectId: 1,
      members: [{ id: 1 }, { id: 3 }],
      due_date: "2024-04-06T14:30:00Z",
      completed: false,
      completedAt: null,
      startedAt: null,
    };

    await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .send(updateData)
      .expect(200);
  });

  it("should delete a task", async () => {
    await request(app.getHttpServer()).delete(`/tasks/${taskId}`).expect(200);
  });
});
