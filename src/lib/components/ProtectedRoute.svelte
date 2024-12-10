<script lang="ts">
  import { hasPermission } from '../utils/rbac';
  import type { Permission, DbUser } from '$lib/types/user';
  import { goto } from '$app/navigation';

  let { user, requiredPermissions, children } = $props<{
    user: DbUser;
    requiredPermissions: Permission[];
    children: any;
  }>();

  $effect(() => {
    if (!user || !requiredPermissions.every((p: Permission) => hasPermission(user, p))) {
      goto('/unauthorized');
    }
  });
</script>

{@render children()} 