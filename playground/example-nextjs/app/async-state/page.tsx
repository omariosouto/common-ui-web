"use server";
import { Box } from "@omariosouto/common-ui-web/components";
import GitHubClientView from "./client";

export default async function Screen() {
  return (
    <Box>
      <GitHubClientView
        githubUserLogin="omariosouto"
      />
    </Box>
  );
}