"use client";
import { useAsyncStateMutation, useAsyncStateQuery } from "@omariosouto/common-ui-web/state";
import { httpClient_getTodos, httpClient_toggleTodoById } from "../httpClient";
import { TodoApp } from "./TodoApp";
import { Todo } from "@/app/api/todos/domain";


export function TodoAppBasicWithPreloadedData({
  initialTodos = [],
}: {
  initialTodos: Todo[];
}) {
  const asyncSuspendedState = useAsyncStateQuery({
    queryKey: ["todos-suspend"],
    suspendRenderization: true,
    async queryFn() {
      const todos = await httpClient_getTodos();
      return todos;
    },
  });

  const asyncState = useAsyncStateQuery({
    suspendRenderization: false,
    async queryFn() {
      const todos = await httpClient_getTodos();
      return todos;
    },
    // initialData: initialTodos,
    enabled: false,
  });

  const toggleMutation = useAsyncStateMutation({
    mutationFn: httpClient_toggleTodoById,
  });

  return (
    <>
      {JSON.stringify(asyncSuspendedState.data[0])}
      {asyncSuspendedState.queryKey}
      {JSON.stringify(asyncState.data?.[0])}
      {asyncState.queryKey}
      {asyncState.isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {asyncState.isError && (
        <div>
          <p>Error: {asyncState.error?.message}</p>
          <button onClick={() => asyncState.refetch()}>Retry</button>
        </div>
      )}
      <TodoApp
        title={"Todo App Basic Preloaded"}
        todosState={asyncSuspendedState}
        isToggling={toggleMutation.isPending}
        onToggleTodo={async (todo) => toggleMutation.mutate({ id: todo.id, })}
      />
    </>
  );
}