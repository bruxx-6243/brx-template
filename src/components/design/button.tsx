import { useCounterStore } from "@/store/counter-store";

export const Button = () => {
  const { count, increment } = useCounterStore();

  return (
    <div>
      <button
        id="count"
        onClick={increment}
        className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        count - {count}
      </button>
    </div>
  );
};
