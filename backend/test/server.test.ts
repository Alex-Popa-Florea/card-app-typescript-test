import { server } from "../src/server";
import Prisma from "../src/db";
import supertest from "supertest";

beforeAll(async () => {
  await server.listen({ port: 3001 });
});

afterAll(async () => {
  await server.close();
  await Prisma.$disconnect();
});

describe("CRUD Operations", () => {
  let createdEntryId: string;

  it("should create a new entry", async () => {
    const newEntry = {
      title: "Test Entry",
      description: "This is a test entry",
      created_at: new Date(),
      scheduled_at: new Date()
    };

    const response = await supertest(server.server)
      .post("/create/")
      .send(newEntry)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    createdEntryId = response.body.id;
    expect(response.body.title).toBe(newEntry.title);
  });

  it("should retrieve all entries", async () => {
    const response = await supertest(server.server)
      .get("/get/")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a single entry by ID", async () => {
    const response = await supertest(server.server)
      .get(`/get/${createdEntryId}`)
      .expect(200);

    expect(response.body).toHaveProperty("id", createdEntryId);
    expect(response.body.title).toBe("Test Entry");
  });

  it("should update an entry", async () => {
    const updatedEntry = {
      title: "Updated Test Entry",
      description: "This is an updated test entry",
      created_at: new Date(),
      scheduled_at: new Date()
    };

    await supertest(server.server)
      .put(`/update/${createdEntryId}`)
      .send(updatedEntry)
      .expect(200);

    const response = await supertest(server.server)
      .get(`/get/${createdEntryId}`)
      .expect(200);

    expect(response.body.title).toBe(updatedEntry.title);
  });

  it("should delete an entry", async () => {
    await supertest(server.server)
      .delete(`/delete/${createdEntryId}`)
      .expect(200);

    await supertest(server.server)
      .get(`/get/${createdEntryId}`)
      .expect(500);
  });

  it("should create a new entry without a scheduled date", async () => {
    const newEntry = {
      title: "Test Entry Without Scheduled Date",
      description: "This entry does not have a scheduled date",
      created_at: new Date()
    };

    const response = await supertest(server.server)
      .post("/create/")
      .send(newEntry)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newEntry.title);
    expect(response.body.scheduled_at).toBeNull();
  });
});