<script>
  export { repo };

  import { onDestroy } from "svelte";
  import { ModifiedReposTracker } from "../logic/ChangesTracker";
  import "@smarthtmlelements/smart-elements/source/modules/smart.button.js";
  import "@smarthtmlelements/smart-elements/source/modules/smart.tank.js";
  import "@smarthtmlelements/smart-elements/source/modules/smart.datetimepicker";

  let repo, smartDatePicker;

  function addStar() {
    repo.watchers_count++;
  }

  const tracker = new ModifiedReposTracker();
  onDestroy(() => tracker.onDestroy());

  let prevRepoId;
  $: if (repo) {
    if (!smartDatePicker) {
      smartDatePicker = document.getElementsByTagName('smart-date-time-picker')[0];
    }

    if (prevRepoId === repo.id) {
      tracker.push(repo);
    }
    prevRepoId = repo.id;

    if (smartDatePicker) {
      smartDatePicker.value = new Date(repo.created_at);
    }
  }
</script>

<style>
  smart-tank {
    height: 460px;
  }
</style>

{#if repo}
  <label>
    Description:
    <textarea bind:value={repo.description} />
  </label>

  <label>
    Created:
    <input type="date" value={new Date(repo.created_at).toISOString().substr(0, 10)} readonly />
    <smart-date-time-picker
            formatString="yyyy-MM-dd"
            calendar-button enable-mouse-wheel-action
            drop-down-position="center-bottom" spin-buttons
            spin-buttons-position="left"></smart-date-time-picker>
  </label>

  <label>
    Stars:
    <input type="number" bind:value={repo.watchers_count} />
    <smart-tank class="animation" readonly="{true}" value="{repo.watchers_count}"
                scale-position="none"></smart-tank>
  </label>

  <br />
  <a href={repo.html_url} target="repo">Link to repo</a>

  <smart-button on:click={addStar}>Add star!</smart-button>
{/if}
