"use client";
import { useAsyncDataQuery, useMutation } from "@omariosouto/common-ui-web/state";
import { useQueryClient } from "@tanstack/react-query";
import { httpClient_deleteTodoById, httpClient_getTodos } from "../httpClient";
import { TodoApp } from "./TodoApp";
import { Todo } from "@/app/api/todos/domain";

export function TodoAppBasic() {
  const asyncState = useAsyncDataQuery({
    async asyncFn() {
      const todos = await httpClient_getTodos();
      return todos;
    },
  });

  // TODO: Move this inside the main library
  const cacheKey = asyncState.key;

  const queryClient = useQueryClient();   // TODO: This must be abstracted
  const deleteMutation = useMutation<
    void,
    Error,
    Todo,
    { previousTodos: Todo[] }
  >({
    mutationFn: ({ id }) => httpClient_deleteTodoById(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: cacheKey });

      const previousTodos = queryClient.getQueryData<Todo[]>(cacheKey) || [];
      queryClient.setQueryData(
        cacheKey,
        previousTodos.filter((t) => t.id !== id)
      );

      return { previousTodos };
    },
    onError: (err, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(cacheKey, context.previousTodos);
      }
      console.error("Error deleting:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cacheKey });
    },
  });

  const toggleMutation = useMutation<
    void,
    Error,
    Todo,
    { previousTodos: Todo[] }
  >({
    mutationFn: ({ id }) => httpClient_deleteTodoById(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: cacheKey });

      const previousTodos = queryClient.getQueryData<Todo[]>(cacheKey) || [];
      queryClient.setQueryData(
        cacheKey,
        previousTodos.filter((t) => t.id !== id)
      );

      return { previousTodos };
    },
    onError: (err, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(cacheKey, context.previousTodos);
      }
      console.error("Error deleting:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cacheKey });
    },
  });

  // ===============================================================
  // ===============================================================

  console.log("[render]", deleteMutation);

  return (
    <>
      <p>
        {deleteMutation.error && (
          <span style={{ color: "red" }}>
            {deleteMutation.error.message}
          </span>
        )}
      </p>
      <TodoApp
        title={"Todo App Basic"}
        todosState={asyncState}
        onToggleTodo={async (todo) => {
          toggleMutation.mutate(todo);
        }}
        onDeleteTodo={async (todo) => {
          deleteMutation.mutate(todo);
        }}
      />
    </>
  );
}