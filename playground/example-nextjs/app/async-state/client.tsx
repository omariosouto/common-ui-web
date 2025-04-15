"use client";
import { useAsyncState } from "@omariosouto/common-ui-web/state";
import { Box, Text } from "@omariosouto/common-ui-web/components";
import { getGitHubUserInfo, GitHubUser } from "./httpClient";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function GitHubClientView({
  githubUserLogin,
  githubUser
}: {
  githubUserLogin: string;
  githubUser?: GitHubUser;
}) {
  const profileQuery = useAsyncState<GitHubUser>({
    queryKey: ["profile"],
    queryFn: async (): Promise<GitHubUser> => {
      await sleep(1000);
      return getGitHubUserInfo(githubUserLogin);
    },
    initialData: githubUser,
  });

  return (
    <Box>
      <Text tag="h1">
        {profileQuery.data?.login}
      </Text>
    </Box>
  );
}