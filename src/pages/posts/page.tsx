import { getAllPosts } from "@/lib/api/controllers/post-controller";
import { createQueryMethod } from "@/lib/api/method";
import { Link } from "@tanstack/react-router";
import { useQueryState } from "nuqs";

export default function PageComponent() {
  const [limit, setLimit] = useQueryState<number>("limit", {
    defaultValue: 1,
    parse: (value: string) => Number.parseInt(value, 10),
  });

  const { data, isLoading, error } = createQueryMethod({
    key: ["posts", limit],
    fn: async () => {
      return await getAllPosts({ limit });
    },
  }).useHook();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-14">
      <div className="flex flex-col gap-2">
        <label htmlFor="limit" className="text-lg text-white">
          Change the limit
        </label>
        <input
          id="limit"
          type="number"
          value={limit}
          className="max-w-12 bg-white px-2 text-black"
          onChange={(e) => setLimit(Number.parseInt(e.target.value, 10))}
        />
      </div>

      {isLoading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-500">{error.message}</div>}

      <ul className="flex flex-col gap-4 text-white">
        {data?.map((post) => (
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
