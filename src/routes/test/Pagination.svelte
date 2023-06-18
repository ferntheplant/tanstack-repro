<script lang="ts">

	import { Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";

  export let settings: PaginationSettings

  console.log('pagination mounting')

</script>

<Paginator bind:settings={settings} />