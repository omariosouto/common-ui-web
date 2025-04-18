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
    async queryFn() {
      const todos = await httpClient_getTodos();
      return todos;
    },
    // How to ignore the initialData after the cache was already changed?
    // placeholderData: initialTodos,
    initialData: initialTodos,
    gcTime: 0,
  });

  const toggleMutation = useAsyncStateMutation({
    mutationFn: httpClient_toggleTodoById,
  });

  return (
    <>
      {JSON.stringify(asyncState.data?.[0])}
      <TodoApp
        title={"Todo App Basic Preloaded"}
        todosState={asyncState}
        isToggling={toggleMutation.isPending}
        onToggleTodo={async (todo) => toggleMutation.mutate({ id: todo.id, })}
      />
    </>
  );
}