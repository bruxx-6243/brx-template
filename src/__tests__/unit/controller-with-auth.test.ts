import ControllerWithAuth from "@/lib/api/controllers/main/controller-with-auth";
import { getAuthToken } from "@/lib/utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/lib/utils", () => ({
  getAuthToken: vi.fn(),
}));

global.fetch = vi.fn();

describe("ControllerWithAuth token behavior", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.NODE_ENV = "test";
  });

  test("Fails when no token is provided", async () => {
    vi.mocked(getAuthToken).mockReturnValue("");
    const controller = new ControllerWithAuth();
    await expect(controller.get("test-url")).rejects.toThrowError(
      "Authentication token is required for this request",
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  test("Passes when token is provided", async () => {
    vi.mocked(getAuthToken).mockReturnValue("mock-jwt-token");
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const controller = new ControllerWithAuth();
    const result = await controller.get("test-url");

    expect(result).toEqual({ success: true });
  });
});
