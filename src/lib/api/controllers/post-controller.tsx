import BaseController from "@/lib/api/handlers/base-controller";
import { Posts } from "@/types";

export default class PostController extends BaseController {
  constructor() {
    super();
  }

  async getAllPosts({ limit = 10 }: { limit?: number }) {
    try {
      return await this.apiService.get<Posts>(`/posts?_limit=${limit}`);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const { getAllPosts } = new PostController();
