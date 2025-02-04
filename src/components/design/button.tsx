import { useState } from "react";

export const Button = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <button
      id="count"
      onClick={() => setCount((prev) => prev + 1)}
      className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
    >
      count - {count}
    </button>
  );
};
