import ControllerWithoutAuth from "@/lib/api/controllers/main/controller-without-auth";
import { beforeAll, describe, expect, expectTypeOf, test } from "vitest";

const BEFORE_ALL_TIMEOUT = 30000;
const url = "/posts";

const controller = new ControllerWithoutAuth();

describe("JSONPlaceholder API tests", () => {
  let getBody: Array<{ [key: string]: unknown }>;
  let postBody: { [key: string]: unknown };

  beforeAll(async () => {
    getBody = await controller.apiService.get(url);

    postBody = await controller.apiService.post(url, undefined, {
      title: "foo",
      body: "bar",
      userId: 1,
    });
  }, BEFORE_ALL_TIMEOUT);

  test("GET request should return an array", () => {
    expectTypeOf(getBody).toBeArray();
  });

  test("The first item in GET response array should contain userId key", () => {
    expect(getBody[0]).toHaveProperty("userId");
  });

  test("POST request response should contain the sent title", () => {
    expect(postBody.title).toBe("foo");
  });

  test("POST request response should contain the sent body", () => {
    expect(postBody.body).toBe("bar");
  });

  test("POST request response should contain the sent userId", () => {
    expect(postBody.userId).toBe(1);
  });
});
