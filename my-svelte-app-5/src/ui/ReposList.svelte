<script>
  export { repos, value };

  import "@smarthtmlelements/smart-elements/source/modules/smart.listbox.js";
  import { onMount } from "svelte";

  let repos = [], value, listControl;

  onMount(async () => {
    listControl = document.querySelector("#listControl");
    listControl.valueMember = "id";
    listControl.displayMember = "title";
    listControl.groupMember = "group";
    listControl.grouped = true;
    listControl.filterable = true;
    listControl.sorted = true;
  });

  $: if (listControl && repos.length) {
    listControl.dataSource = repos.map(r => ({
      id: r.id,
      title: r.name,
    }));
  }

  function change(e) {
    if (e && e.detail) {
      if (e.detail.selected) {
        value = e.detail.value;
      } else {
        value = undefined;
      }
    }
  }
</script>

<style>
  smart-list-box {
    height: 500px;
  }
</style>

<label>
  Repos:
  <smart-list-box id="listControl" placeholder="loading..." on:change={change} />
</label>



