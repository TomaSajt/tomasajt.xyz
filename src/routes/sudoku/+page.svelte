<script lang="ts">
    let board: number[];
    let fixed: boolean[];
    import { makeBoard } from "$lib/sudoku";
    import { onMount } from "svelte";
    let inited = false;
    let selectedInd = -1;
    function onClickSquare(i: number) {
        if (fixed[i]) return;
        selectedInd = i;
    }
    onMount(() => {
        board = makeBoard(30);
        fixed = Array(81).fill(true);
        for (let i = 0; i < 81; i++) {
            if (board[i] == 0) fixed[i] = false;
        }
        inited = true;
        document.addEventListener("keydown", keydown);
        return () => document.removeEventListener("keydown", keydown);
    });

    function keydown(e: KeyboardEvent) {
        console.log(e.key);
        if (selectedInd == -1) return;
        if (e.key == "Enter") {
            selectedInd = -1;
            return;
        }
        if (e.key == "Backspace" || e.key == "Delete" || e.key == "0") {
            board[selectedInd] = 0;
            return;
        }
        let n = Number(e.key);
        if (isNaN(n) || n < 1 || n > 9) return;
        console.log(n);
        board[selectedInd] = n;
    }
</script>

<h1 class="my-10 text-5xl font-mono text-center">Sudoku</h1>
{#if inited}
    <div class="max-w-2xl mx-auto">
        <div class="w-4/5 mx-auto select-none relative">
            <div class="grid grid-cols-9 inset-0">
                {#each Array(81) as _, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="aspect-square grid place-items-center border border-slate-900"
                        class:bg-blue-300={fixed[i]}
                        class:bg-blue-50={!fixed[i]}
                        class:hover:bg-blue-100={!fixed[i]}
                        class:bg-blue-600={i == selectedInd}
                        class:hover:bg-blue-600={i == selectedInd}
                        class:hover:cursor-pointer={!fixed[i]}
                        on:click={() => onClickSquare(i)}
                    >
                        {board[i] == 0 ? "" : `${board[i]}`}
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
