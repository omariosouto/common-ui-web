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
  const asyncState = useAsyncStateQuery({
    suspendRenderization: true,
    async queryFn() {
      const todos = await httpClient_getTodos();
      return todos;
    },
    initialData: initialTodos,
  });

  const toggleMutation = useAsyncStateMutation({
    invalidateStates: false,
    mutationFn: httpClient_toggleTodoById,
    invalidateState: asyncState.queryKey,
  });

  return (
    <>
      {JSON.stringify(asyncState.data[0])}
      <TodoApp
        title={"Todo App Basic Preloaded"}
        todosState={asyncState}
        isToggling={toggleMutation.isPending}
        onToggleTodo={async (todo) => toggleMutation.mutate({ id: todo.id, })}
      />
    </>
  );
}