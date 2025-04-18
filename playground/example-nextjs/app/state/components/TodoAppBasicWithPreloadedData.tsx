"use client";
import { useAsyncStateQuery } from "@omariosouto/common-ui-web/state";
import { httpClient_getTodos } from "../httpClient";
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
    gcTime: 0,
  });

  return (
    <>
      {JSON.stringify(asyncState.data[0])}
      <TodoApp
        title={"Todo App Basic Preloaded"}
        todosState={asyncState}
        isToggling={false}
      />
    </>
  );
}