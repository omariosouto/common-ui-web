"use server";
import { Box } from "@omariosouto/common-ui-web/components";
import GitHubClientView from "./client";
import { getGitHubUserInfo } from "./httpClient";

export default async function Screen() {
  const githubUserLogin = "omariosouto";
  const githubUser = await getGitHubUserInfo(githubUserLogin);

  return (
    <Box>
      <GitHubClientView
        githubUserLogin="omariosouto"
        githubUser={githubUser}
      />
    </Box>
  );
}