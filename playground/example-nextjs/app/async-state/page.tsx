import { useAsyncState } from "@omariosouto/common-ui-web/state";
import { Box, Text } from "@omariosouto/common-ui-web/components";

export default function Screen() {
  const profileQuery = useAsyncState({

  })

  return (
    <Box>
      <Text tag="h1">
        This is a test screen for the async state.
      </Text>
    </Box>
  );
}