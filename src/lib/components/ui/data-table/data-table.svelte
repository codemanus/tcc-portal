<script lang="ts">
    export let columns: Array<{
        accessorKey: string;
        header: string;
    }>;
    export let data: Array<any>;
</script>

<div class="relative w-full overflow-auto">
    <table class="w-full caption-bottom text-sm">
        <thead>
            <tr class="border-b">
                {#each columns as column}
                    <th class="h-12 px-4 text-left align-middle font-medium">
                        {column.header}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data as row}
                <tr class="border-b">
                    {#each columns as column}
                        <td class="p-4 align-middle">
                            {row[column.accessorKey]}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div> 