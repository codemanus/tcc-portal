<script lang="ts">
    import { hasPermission } from '$lib/utils/rbac';
    import type { PageData } from './$types';
    import type { DbUser } from '$lib/types/user';

    export let data: PageData;
    const user = data.user as unknown as DbUser;
</script>

<div>
    <h1>Campus</h1>
    {#if hasPermission(user, 'VIEW_CAMPUS')}
        <!-- Show campus content -->
    {/if}
</div>
