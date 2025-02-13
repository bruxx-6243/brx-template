import BaseController from "@/lib/api/handlers/base-controller";
import type { Posts } from "@/types";

export default class PostController extends BaseController {
  constructor() {
    super();
  }

  async getAllPosts({ limit }: { limit?: number }) {
    try {
      const query = new URLSearchParams();

      if (limit) {
        query.append("_limit", String(limit));
      }

      return await this.apiService.get<Posts>(`/pposts?${query}`);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const { getAllPosts } = new PostController();
