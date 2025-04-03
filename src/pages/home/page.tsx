import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function PageComponent() {
  const tasks = useQuery(api.tasks.get);
  const createTaskMutation = useMutation(api.tasks.createTask);
  const markTaskCompleted = useMutation(api.tasks.markTaskCompleted);
  const deleteTaskMuation = useMutation(api.tasks.deleteTask);

  const [task, setTask] = useState<{
    text: string;
    isCompleted: boolean;
  }>({
    text: "",
    isCompleted: false,
  });

  return (
    <div className="min-w-96 space-y-6">
      <ul className="flex flex-col gap-1">
        {tasks?.map(({ _id, text, isCompleted }) => (
          <li
            key={_id}
            className={cn(
              isCompleted && "cursor-not-allowed text-red-600",
              "flex items-center justify-between",
            )}
          >
            {text}

            <div className="flex items-center gap-2">
              <button
                className={cn(
                  isCompleted ? "cursor-not-allowed" : "cursor-pointer",
                )}
                disabled={isCompleted}
                onClick={() => {
                  markTaskCompleted({ id: _id });
                  toast.success("Task marked as completed");
                }}
              >
                ✅
              </button>
              <button
                className="cursor-pointer"
                onClick={() => {
                  deleteTaskMuation({ id: _id });
                  toast.success("Task deleted");
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form
        className="flex max-w-sm flex-col gap-4"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (task.text.trim() === "") return;

          createTaskMutation({
            isCompleted: task.isCompleted,
            text: task.text.trim(),
          });
          setTask({ text: "", isCompleted: false });
          toast.success(`Task created with`);
        }}
      >
        <input
          type="text"
          className="ring-2"
          value={task.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTask({
              text: e.target.value,
              isCompleted: task.isCompleted,
            });
          }}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
