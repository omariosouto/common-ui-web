"use client";
import { Todo } from "../../api/todos/domain";
import { Box, Text } from "@omariosouto/common-ui-web/components";

export function TodoApp({
  title,
  todosState,
}: {
  title: string;
  todosState: {
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    data?: Todo[];
  };
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
        {title}
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
          </Box>
        ))}
      </Box>
    </Box>
  )
}