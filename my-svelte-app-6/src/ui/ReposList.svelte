<script>
  export { repos, value };

  let repos = [], value;

</script>

<label>
  Repos:
  <select class="repos" size="2" bind:value>
    {#each repos as repo}
      <option value="{repo.id}">{repo.name}</option>
    {/each}
  </select>
</label>
