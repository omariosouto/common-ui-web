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
  const asyncState = useAsyncState({
    async asyncFn() {
      const todos = await httpClient_getTodos();
      return todos;
    },
    initialData: initialTodos,
  });

  return (
    <TodoApp
      title={"Todo App Basic Preloaded"}
      todosState={asyncState}
    />
  );
}