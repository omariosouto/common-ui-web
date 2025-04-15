"use client";
import { useAsyncState } from "@omariosouto/common-ui-web/state";
import { Box, Text } from "@omariosouto/common-ui-web/components";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function GitHubClientView() {
  const profileQuery = useAsyncState({
    queryKey: ["profile"],
    queryFn: async () => {
      await sleep(1000);
      return {
        name: "omariosouto",
        age: 27,
      };
    },
  })

  return (
    <Box>
      <Text tag="h1">
        {profileQuery.data?.name}
      </Text>
    </Box>
  );
}