export function GithubReository() {
  const getRepValue = async (repoUrl: string) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/github/repository",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cloneUrl: repoUrl,
        }),
      }
    );

    const data = await response.json();
    console.log("this is commng form the repo response", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to send repository");
    }

    return data;
  };

  return{
    getRepValue
  }
}
