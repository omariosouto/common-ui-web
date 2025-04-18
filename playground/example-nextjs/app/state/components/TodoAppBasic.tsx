"use client";
import {
  queryOptions,
  useQuery,
  useAsyncStateMutation,
} from "@omariosouto/common-ui-web/state";
import { httpClient_deleteTodoById, httpClient_getTodos, httpClient_toggleTodoById } from "../httpClient";
import { TodoApp } from "./TodoApp";
// import { Todo } from "@/app/api/todos/domain";
import { Button } from "@omariosouto/common-ui-web/components";
import { Todo } from "@/app/api/todos/domain";

// > useQuery is declarative, useMutation is imperative.


const todoStateKeys = {
  all: () => ['todos'] as const,
  allFiltered: (filters: string) => [...todoStateKeys.all(), { filters }] as const,
  detail: (id: number) => [...todoStateKeys.all(), id] as const,
};

function todosOptions() {
  return queryOptions({
    queryKey: todoStateKeys.all(),
    queryFn: () => httpClient_getTodos(),
  })
}

export function TodoAppBasic() {
  const asyncState = useQuery(todosOptions());

  const toggleMutation = useAsyncStateMutation({
    invalidateStates: false,
    stateKey: todoStateKeys.all(),
    invalidateState: true,
    mutationFn: httpClient_toggleTodoById,
    async onOptimisticUpdate({ queryClient, variables }) {
      const oldState = queryClient.getQueryData<Todo[]>(todoStateKeys.all()) || [];

      queryClient.setQueryData(
        todoStateKeys.all(),
        (todos: Todo[] = []) => todos.map((todo) =>
          todo.id === variables.id ? { ...todo, completed: !todo.completed } : todo
        ),
      );

      return { oldState };
    },
    onOptimisticUpdateRollback: (input) => {
      if (input.context?.oldState) {
        input.queryClient.setQueryData(todoStateKeys.all(), input.context.oldState);
      }
    },
  });

  const deleteMutation = useAsyncStateMutation({
    mutationFn: httpClient_deleteTodoById,
  });

  return (
    <>
      <p>
        {deleteMutation.error && (
          <span style={{ color: "red" }}>
            {deleteMutation.error.message} - Attempts: {deleteMutation.failureCount}
          </span>
        )}
      </p>
      <p>
        {toggleMutation.error && (
          <>
            <span style={{ color: "red" }}>
              {toggleMutation.error.message} - Attempts: {toggleMutation.failureCount}
            </span>
            <Button onClick={() => toggleMutation.reset()}>Reset Error</Button>
          </>
        )}
      </p>

      <TodoApp
        title={"Todo App Basic"}
        todosState={asyncState}
        isToggling={toggleMutation.isPending}
        onToggleTodo={async (todo) => {
          toggleMutation.mutate({
            id: todo.id,
          });
        }}
        onDeleteTodo={async (todo) => {
          deleteMutation.mutate({
            todoId: todo.id,
          });
        }}
      />
    </>
  );
}