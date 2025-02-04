import { create } from "zustand";

type CounterState = {
  count: number;
  reset: () => void;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,

  reset: () => set({ count: 0 }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
