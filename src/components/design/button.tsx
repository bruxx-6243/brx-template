import { useCounterStore } from "@/store/counter-store";

export const Button = () => {
  const { count, increment } = useCounterStore();

  return (
    <div>
      <button
        id="count"
        onClick={increment}
        className="cursor-pointer rounded-full bg-white px-4 py-2 font-semibold text-black"
      >
        count - {count}
      </button>
    </div>
  );
};
