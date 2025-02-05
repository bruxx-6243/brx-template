import ApiError from "@/lib/api/handlers/api-error";
import ApiService from "@/lib/api/services";

export default class BaseController {
  protected readonly apiService: ApiService;

  protected handleError(error: unknown) {
    if (error instanceof ApiError) {
      console.error(error.message);
    }

    throw error;
  }

  constructor() {
    this.apiService = new ApiService();

    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      // @ts-expect-error HACK: this warn can be ignore
      .filter((methodName): methodName is keyof this => {
        return (
          methodName !== "constructor" &&
          typeof this[methodName as keyof this] === "function"
        );
      })
      .forEach((methodName) => {
        this[methodName as keyof this] =
          // @ts-expect-error HACK: this warn can be ignore
          this[methodName as keyof this].bind(this);
      });
  }
}
