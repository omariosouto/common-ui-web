import { ExamplesGrid } from "./client";
import { httpClient_getTodos } from "./httpClient";

export default async function Screen() {
  const initialTodos = await httpClient_getTodos();

  return (
    <div
      className="p-4"
    >
      <h1
        className="text-4xl font-bold"
      >
        Working with State
      </h1>

      {/* create a grid with squares based on screen width positioning them as space is available */}
      <ExamplesGrid initialData={initialTodos} />
    </div>
  );
}