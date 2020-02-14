<script>
  export { repo };

  import { onDestroy } from "svelte";
  import { ModifiedReposTracker } from "../logic/ChangesTracker";

  let repo;

  function addStar() {
    repo.watchers_count++;
  }

  const tracker = new ModifiedReposTracker();
  onDestroy(() => tracker.onDestroy());

  let prevRepoId;
  $: if (repo) {
    if (prevRepoId === repo.id) {
      tracker.push(repo);
    }
    prevRepoId = repo.id;
  }
</script>

{#if repo}
  <label>
    Description:
    <textarea bind:value={repo.description} />
  </label>

  <label>
    Created:
    <input type="date" readonly value={new Date(repo.created_at).toISOString().substr(0, 10)} />
  </label>

  <label>
    Stars:
    <input type="number" bind:value={repo.watchers_count}/>
  </label>

  <br />
  <a href={repo.html_url} target="repo">Link to repo</a>

  <button on:click={addStar}>Add star!</button>
{/if}
