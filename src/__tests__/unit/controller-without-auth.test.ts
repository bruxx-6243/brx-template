import ControllerWithoutAuth from "@/lib/api/controllers/main/controller-without-auth";
import { beforeEach, describe, expect, test, vi } from "vitest";

global.fetch = vi.fn();

describe("ControllerWithoutAuth token behavior", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("Succeeds with no token", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const controller = new ControllerWithoutAuth();
    const result = await controller.get("test-url");

    expect(result).toEqual({ success: true });
    expect(fetch).toHaveBeenCalledWith(
      "test-url",
      expect.not.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    );
  });
});
