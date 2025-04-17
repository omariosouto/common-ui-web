"use client";
import { useAsyncState } from "@omariosouto/common-ui-web/state";
import { httpClient_getTodos } from "../httpClient";
import { TodoApp } from "./TodoApp";
import { Todo } from "@/app/api/todos/domain";


export function TodoAppBasicWithPreloadedData({
  initialTodos = [],
}: {
  initialTodos: Todo[];
}) {
  const todosState = useAsyncState({
    async asyncFn() {
      return httpClient_getTodos();
    },
    initialData: initialTodos,
  });

  return (
    <TodoApp
      title={"Todo App Basic Preloaded"}
      todosState={todosState}
    />
  );
}