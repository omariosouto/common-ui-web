"use client";
import { useAsyncStateQuery } from "@omariosouto/common-ui-web/state";
import { Box, Button, Text } from "@omariosouto/common-ui-web/components";
import { getGitHubUserInfo, GitHubRepo, GitHubUser } from "./httpClient";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function GitHubClientView({
  githubUserLogin,
  // githubUser
}: {
  githubUserLogin: string;
  githubUser?: GitHubUser;
}) {
  const profileQuery = useAsyncStateQuery<GitHubUser>({
    suspendRenderization: true,
    queryKey: ["profile"],
    queryFn: async () => {
      await sleep(1000);
      return getGitHubUserInfo(githubUserLogin);
    },
    // initialData: githubUser,
  });

  const reposQuery = useAsyncStateQuery<GitHubRepo[]>({
    queryKey: ["repos", profileQuery.data?.login],
    queryFn: async ({ queryKey }) => {
      console.log("[reposQuery]", queryKey);
      await sleep(1000);
      return fetch(`https://api.github.com/users/${profileQuery.data?.login}/repos`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data as GitHubRepo[];
        });
    },
    // This only runs if the initial query is already loaded
    enabled: Boolean(profileQuery.data),
  });

  return (
    <Box>
      <Text tag="h1">
        {profileQuery.data?.login}
        {profileQuery.isLoading && <Text>Loading user...</Text>}
      </Text>
      {reposQuery.isLoading && <Text>Loading...</Text>}
      {reposQuery.isError && (
        <Box>
          <Text>Error: {reposQuery.error?.message}</Text>
          <Button
            onClick={() => {
              reposQuery.refetch();
            }}
          >
            Retry
          </Button>
        </Box>
      )}
      {!reposQuery.isLoading && (
        <ul>
          {reposQuery.data?.map((repo) => (
            <li key={repo.full_name}>
              <Text tag="h2">
                {repo.full_name}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}