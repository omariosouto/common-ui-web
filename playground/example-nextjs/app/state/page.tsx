import { httpClient_getTodos } from "./httpClient";
// import { ErrorBoundary } from "@omariosouto/common-ui-web/components";
// import { ExamplesGrid } from "./client";

export default async function Screen() {
  // TODO: There's a way of by default inject this in the cache by the key?
  const initialTodos = await httpClient_getTodos();
  console.log("initialTodos", initialTodos);

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
      {/* <ErrorBoundary>
        <ExamplesGrid initialData={initialTodos} />
      </ErrorBoundary> */}
    </div>
  );
}