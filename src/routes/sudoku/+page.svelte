<script lang="ts">
    let board: number[];
    let fixed: boolean[];
    import { checkSolvable, makeBoard, getPosInfo } from "./sudoku";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    let inited = false;
    let solved = false;

    let selectedInput = 1;

    onMount(() => {
        restart();
        inited = true;
        document.addEventListener("keydown", keydown);
        return () => document.removeEventListener("keydown", keydown);
    });

    function onClickSquare(i: number) {
        if (solved) return;
        if (fixed[i]) return;
        board[i] = board[i] === selectedInput ? 0 : selectedInput;
        checkDone();
    }

    function restart() {
        solved = false;
        board = makeBoard(30);
        fixed = Array(81).fill(true);
        for (let i = 0; i < 81; i++) {
            if (board[i] == 0) fixed[i] = false;
        }
        checkDone();
    }

    function keydown(e: KeyboardEvent) {
        if (solved) return;
        let n = Number(e.key);
        if (isNaN(n) || n < 1 || n > 9) return;
        console.log(n);
        selectedInput = n;
        checkDone();
    }

    function checkDone() {
        let c = board.filter((x) => x !== 0).length;
        console.log(c);
        if (c == 81 && checkSolvable(board) == 1) {
            solved = true;
            console.log("solvable");
        }
    }
</script>

<h1 class="my-10 text-5xl font-mono text-center">Sudoku</h1>
<div class="grid place-content-center">
    {#if inited}
        <button
            class="rounded bg-slate-400 w-fit px-4 py-2 mb-4"
            on:click={() => restart()}>Restart</button
        >
    {:else}
        <div>Loading board...</div>
    {/if}
</div>
{#if inited}
    <div class="max-w-2xl mx-auto">
        <div class="w-4/5 mx-auto">
            <div class="relative">
                <div class="grid grid-cols-9 inset-0 select-none">
                    {#each Array(81) as _, i}
                        <button
                            class="aspect-square grid place-items-center border filter border-slate-900 cursor"
                            class:cursor-default={fixed[i]}
                            class:text-lg={!fixed[i]}
                            class:font-extrabold={!fixed[i]}
                            class:bg-yellow-500={selectedInput !== 0 &&
                                board[i] === selectedInput}
                            on:click={() => onClickSquare(i)}
                        >
                            {board[i] == 0 ? "" : `${board[i]}`}
                        </button>
                    {/each}
                </div>
                <div
                    class="grid grid-cols-3 absolute inset-0 border-2 border-slate-900 pointer-events-none"
                >
                    {#each Array(9) as _}
                        <div class="aspect-square border-2 border-slate-900" />
                    {/each}
                </div>
                {#if solved}
                    <div
                        class="grid absolute inset-0 p-4 place-items-center bg-[rgb(0,0,0,0.9)]"
                        transition:fade
                    >
                        <span class="text-7xl text-white">You won!</span>
                    </div>
                {/if}
            </div>

            <div class="grid grid-cols-9 mt-4 border border-slate-900">
                {#each Array(9) as _, i}
                    <button
                        class="aspect-square border border-slate-900"
                        class:bg-yellow-500={i + 1 === selectedInput}
                        on:click={() => (selectedInput = i + 1)}>{i + 1}</button
                    >
                {/each}
            </div>
            <div class="mt-4">
                <div class="text-xl">Controls:</div>
                <div>Select input value from bottom bar</div>
                <div>Click an empty cell in the sudoku board to set value</div>
                <div>Click again to remove value</div>
            </div>
        </div>
    </div>
{/if}

<style lang="postcss">
</style>
