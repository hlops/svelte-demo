<script>
  import RepoDetails from "./RepoDetails.svelte";
  import ReposList from "./ReposList.svelte";
  import { repos } from "../logic/Client";

  let repoId, repo, repoMap;

  $: {
    if ($repos) {
      repoMap = $repos.reduce((result, r) => {
        result[r.id] = r;
        return result;
      }, {});
    }
  }

  $: if (repoId) {
    repo = repoMap[repoId];
  }
</script>

<style>
  :global(label) {
    display: inline-grid;
  }

  :global(select, textarea) {
    width: 300px;
    height: 500px;
    resize: none;
  }
</style>

<main>

  <h1>Rich Harris's github repositories</h1>
  <ReposList repos={$repos} bind:value={repoId} />
  <RepoDetails repo={repo} />
</main>
