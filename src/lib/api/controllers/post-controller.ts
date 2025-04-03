import ControllerWithoutAuth from "@/lib/api/controllers/main/controller-without-auth";
import type { Posts } from "@/types";

export default class PostController extends ControllerWithoutAuth {
  async getAllPosts({ limit }: { limit?: number }) {
    try {
      const query = new URLSearchParams();

      if (limit) {
        query.set("_limit", String(limit));
      }

      return await this.apiService.get<Posts>(`/posts?${query}`);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const { getAllPosts } = new PostController();
