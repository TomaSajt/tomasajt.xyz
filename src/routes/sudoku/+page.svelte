<script lang="ts">
    import { init, board, fixed } from "$lib/sudoku";
    import { onMount } from "svelte";
    let inited = false;
    function onClickSquare(i: number) {
        if (fixed[i]) return;
        let x = i % 9;
        let y = (i / 9) | 0;
        console.log(`${x} ${y}`);
        board[i]++;
        board[i] %= 10;
    }
    onMount(() => {
        init();
        inited = true;
    });
</script>

{#if inited}
    <div class="max-w-2xl mx-auto">
        <div class="mt-10 w-4/5 mx-auto select-none relative">
            <div class="grid grid-cols-9 inset-0">
                {#each Array(81) as _, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="aspect-square grid place-items-center bg-red-300 border border-slate-900"
                        class:bg-red-600={fixed[i]}
                        class:hover:cursor-pointer={!fixed[i]}
                        class:hover:bg-red-400={!fixed[i]}
                        on:click={() => onClickSquare(i)}
                    >
                        {board[i]}
                    </div>
                {/each}
            </div>
            <div
                class="grid grid-cols-3 absolute inset-0 border-2 border-slate-900 pointer-events-none"
            >
                {#each Array(9) as _, i}
                    <div class="aspect-square border-2 border-slate-900" />
                {/each}
            </div>
        </div>
    </div>
{:else}
    <div>Loading board...</div>
{/if}

<style lang="postcss">
</style>
