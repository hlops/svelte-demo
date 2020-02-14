<script>
  export { repo };

  import { onDestroy } from "svelte";
  import { ModifiedReposTracker } from "../logic/ChangesTracker";
  import { WiredInput } from "wired-input";
  import { WiredTextarea } from "wired-textarea"
  import { WiredLink } from "wired-link";
  import { WiredButton } from "wired-button";
  import { WiredListbox } from "wired-listbox";
  import { WiredCard } from "wired-card";

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

<style>
  wired-card {
    position: fixed;
  }

  .colored {
    background: yellow;
    color: red;
  }
</style>

{#if repo}
  <wired-card elevation="3">
    <label>
      Description:
      <wired-textarea value={repo.description} />
    </label>

    <label>
      Created:
      <wired-input type="date" readonly
                   value={new Date(repo.created_at).toISOString().substr(0, 10)} />
    </label>

    <label>
      Stars:
      <wired-input type="number" value={repo.watchers_count} />
    </label>

    <br /><br />
    <wired-link href={repo.html_url} elevation="2" target="repo">Link to repo</wired-link>

    <wired-button class="colored" elevation="3" on:click={addStar}>Add star!</wired-button>
    <br />
  </wired-card>
{/if}
