<script lang="ts">
	import type { PageData } from './$types';
	import { createQuery } from '@tanstack/svelte-query';
	import { ProgressRadial, type PaginationSettings } from '@skeletonlabs/skeleton';
  import Pagination from './Pagination.svelte';

	export let data: PageData;

	let settings: PaginationSettings = {
		limit: 10,
		offset: 0,
		size: 100,
		amounts: [10]
	};

  // <Paginator /> will actually set the `settings` object every time it renders 
  $: {
    console.log('Limit: ', settings.limit)
    console.log('Offset: ', settings.offset)
  }

	async function getter(limit: number, offset: number) {
    console.log('Fetching')
		const data = (
			await (await fetch(`https://dummyjson.com/posts?skip=${offset}&limit=${limit}`)).json()
		).posts as {
			id: number;
			title: string;
			body: string;
			userId: number;
			tags: string[];
			reaction: number;
		}[];
		return data;
	}

	$: query = createQuery({
		queryKey: ['query', settings.limit, settings.offset],
		// settings.offset is actually the page number for some reason
		queryFn: async () => await getter(settings.limit, settings.offset * settings.limit),
		initialData: data.data,
		keepPreviousData: true
	});
</script>

<div class="table-container">
	<div class="table">
		<thead>
			<tr>
				<th>Title</th>
				<th>UserId</th>
			</tr>
		</thead>
		<tbody>
			{#each $query.data as row}
				<tr>
					<td>{row.title}</td>
					<td>{row.userId}</td>
				</tr>
			{/each}
		</tbody>
	</div>
</div>
{#if $query.isRefetching}
	<ProgressRadial value={undefined} />
{:else}
	<Pagination bind:settings={settings} />
{/if}
