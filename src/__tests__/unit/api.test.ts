import { beforeAll, describe, expect, expectTypeOf, test } from "vitest";

const BEFORE_ALL_TIMEOUT = 30000;
const url = "https://jsonplaceholder.typicode.com/posts";

describe("JSONPlaceholder API tests", () => {
  let getResponse: Response;
  let postResponse: Response;
  let postBody: { [key: string]: unknown };
  let getBody: Array<{ [key: string]: unknown }>;

  beforeAll(async () => {
    getResponse = await fetch(url);
    getBody = await getResponse.json();

    postResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
    });

    postBody = await postResponse.json();
  }, BEFORE_ALL_TIMEOUT);

  test("GET request should have response status 200", () => {
    expect(getResponse.status).toBe(200);
  });

  test("GET request should have content-type", () => {
    expect(getResponse.headers.get("Content-Type")).toBe(
      "application/json; charset=utf-8",
    );
  });

  test("GET request should have array in the body", () => {
    expectTypeOf(getBody).toBeArray();
  });

  test("The first item in GET response array should contain userId key", () => {
    expect(getBody[0]).toHaveProperty("userId");
  });

  test("POST request should have response status 201", () => {
    expect(postResponse.status).toBe(201);
  });

  test("POST request should have content-type", () => {
    expect(postResponse.headers.get("Content-Type")).toBe(
      "application/json; charset=utf-8",
    );
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
