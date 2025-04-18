

export interface GitHubUser {
  login: string;
  id: number;
  followers: number;
  following: number;
  repos_url: string;
}

export interface GitHubRepo {
  full_name: string;
}

const randomThrow = (chance: number) => {
  const randomNumber = Math.random();
  const willThrow = randomNumber < chance;
  console.log("randomThrow", {randomNumber, chance, willThrow});
  if (willThrow) {
    throw new Error("Random error");
  }
}

export async function getGitHubUserInfo(githubUser: string): Promise<GitHubUser> {

  // throw in 50% of the requests
  randomThrow(0.5);

  return fetch(`https://apia.github.com/users/${githubUser}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data as GitHubUser;
    })
    .catch(() => {
      return {
        login: "omariosouto",
        id: 233232198,
        followers: 0,
        following: 0,
        repos_url: "",
      }
    });
}