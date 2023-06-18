<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
	import { browser } from '$app/environment';

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser
      }
    }
  })
</script>

<QueryClientProvider {client} ><slot /></QueryClientProvider>

