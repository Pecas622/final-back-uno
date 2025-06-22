import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080/api");

describe("TESTEANDO AUTH & USERS", () => {
  let userId;
  let cookies;
  it("POST /api/auth/register", async () => {
    const response = await requester
      .post("/auth/register")
      .send({ email: "test@coder.com", password: "test", city: "test" });
    const { status, _body } = response;
    userId = _body.response;
    expect(status).to.equals(201);
  });
  it("POST /api/auth/login", async () => {
    const response = await requester
      .post("/auth/login")
      .send({ email: "test@coder.com", password: "test" });
    const { status, headers } = response;
    cookies = headers["set-cookie"];
    expect(status).to.equals(200);
  });
  it("PUT /api/users", async () => {
    const response = await requester.put("/users").send({ city: "TEST" }).set("Cookie", cookies);
    const { status } = response;
    expect(status).to.equals(200);
  });
  it("DELETE /api/users", async () => {
    const response = await requester.delete("/users").set("Cookie", cookies);
    const { status } = response;
    expect(status).to.equals(200);
  });
});