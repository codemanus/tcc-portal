<script lang="ts">
  import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

{#if data.user}
  <ProtectedRoute user={data.user} requiredPermissions={['read:course']}>
    <div class="courses-page">
      <!-- Your protected content here -->
    </div>
  </ProtectedRoute>
{:else}
  <div>Loading...</div>
{/if} 