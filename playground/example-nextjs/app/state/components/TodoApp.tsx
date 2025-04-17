"use client";
import { Todo } from "../../api/todos/domain";
import { Box, Button, Text } from "@omariosouto/common-ui-web/components";

export function TodoApp({
  title,
  todosState,
  onDeleteTodo,
}: {
  title: string;
  todosState: {
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    data?: Todo[];
    refetch: () => void;
  };
  onDeleteTodo?: (todoToBeDeleted: Todo) => Promise<void>;
}) {

  if (todosState.isError) {
    return (
      <Box>
        <Text>Error: {todosState?.error?.message}</Text>
      </Box>
    )
  }

  return (
    <Box>
      <Text
        tag="h2"
        className="text-2xl font-bold mb-4"
      >
        {title} <button onClick={() => todosState.refetch()}>reload</button>
      </Text>
      <Box tag="ul">
        {todosState.isLoading && (
          <Box>
            <Text>Loading...</Text>
          </Box>
        )}

        {todosState?.data?.map((todo) => (
          <Box tag="li"
            key={todo.id}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              defaultChecked={todo.completed}
            />
            <Text
              className="text-lg"
            >
              {todo.title}
            </Text>
            <Button
              size={"sm"}
              variant={"destructive"}
              onClick={async () => onDeleteTodo && await onDeleteTodo(todo)}
            >
              delete
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}