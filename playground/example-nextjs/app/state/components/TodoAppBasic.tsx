"use client";
import { useAsyncState } from "@omariosouto/common-ui-web/state";
import { httpClient_getTodos } from "../httpClient";
import { TodoApp } from "./TodoApp";

function useTodos() {
  const asyncState = useAsyncState({
    asyncFn: async () => {
      return httpClient_getTodos();
    },
  });

  return asyncState;
}

export function TodoAppBasic() {
  const todosState = useTodos();

  return (
    <TodoApp
      title={"Todo App Basic"}
      todosState={todosState}
    />
  );
}