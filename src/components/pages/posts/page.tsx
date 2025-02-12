import { getAllPosts } from "@/lib/api/controllers/post-controller";
import createMethod from "@/lib/api/method";
import { Link } from "@tanstack/react-router";
import { parseAsInteger, useQueryState } from "nuqs";

export default function PageComponent() {
  const [limit, setlimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(5),
  );

  const postMethod = createMethod({
    type: "query",
    key: ["posts", limit],
    fn: () => getAllPosts({ limit }),
  }).useHook();

  const { data: posts, error, isLoading } = postMethod;

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-14">
      <div className="flex flex-col gap-2">
        <label htmlFor="limit" className="text-white">
          change the limit
        </label>
        <input
          id="limit"
          type="number"
          value={limit}
          className="max-w-12 bg-white px-2 text-black"
          onChange={(e) => setlimit(Number.parseInt(e.target.value, 10))}
        />
      </div>

      {isLoading && <div className="text-white">Loading...</div>}

      {error && <div className="text-white">Error: {error.message}</div>}

      <ul className="flex flex-col gap-4 text-white">
        {posts?.map((post) => (
          <li key={post.id} className="flex flex-col space-y-2">
            <span className="inline-block text-xl font-semibold text-amber-300">
              {post.id} - {post.title}
            </span>
            <span className="inline-block text-neutral-300">{post.body}</span>
          </li>
        ))}
      </ul>

      <Link to="/" className="mt-12 inline-block text-white underline">
        home
      </Link>
    </div>
  );
}
