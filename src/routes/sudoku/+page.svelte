<script lang="ts">
    let board: number[];
    let fixed: boolean[];
    let styleStates: StyleState[];
    let interest: boolean[];
    let conflict: boolean[];
    import { checkSolvable, makeBoard, getPosInfo } from "$lib/sudoku";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    let inited = false;
    let solved = false;
    let selectedInd: number;
    function onClickSquare(i: number) {
        if (fixed[i]) return;
        selectedInd = i;
        updateCellStyles();
    }
    onMount(() => {
        restart();
        inited = true;
        document.addEventListener("keydown", keydown);
        return () => document.removeEventListener("keydown", keydown);
    });

    function restart() {
        solved = false;
        selectedInd = -1;
        board = makeBoard(30);
        fixed = Array(81).fill(true);
        for (let i = 0; i < 81; i++) {
            if (board[i] == 0) fixed[i] = false;
        }
        checkDone();
        updateCellStyles();
    }
    function updateCellStyles() {
        // 0 - fixed, 1 - interactable, 2 - selected, 3 - solved
        styleStates = Array(81).fill(0);
        interest = Array(81).fill(false);
        conflict = Array(81).fill(false);
        let selPosInfo = getPosInfo(selectedInd);
        for (let i = 0; i < 81; i++) {
            if (solved) styleStates[i] = StyleState.Solved;
            else if (fixed[i]) styleStates[i] = StyleState.Fixed;
            else if (i == selectedInd) styleStates[i] = StyleState.Selected;
            else styleStates[i] = StyleState.Normal;
            if (selectedInd == -1) continue;
            let posInfo = getPosInfo(i);
            interest[i] =
                selPosInfo.aid == posInfo.aid ||
                selPosInfo.x == posInfo.x ||
                selPosInfo.y == posInfo.y ||
                (board[selectedInd] != 0 && board[selectedInd] == board[i]);
            conflict[i] =
                (selPosInfo.aid == posInfo.aid ||
                    selPosInfo.x == posInfo.x ||
                    selPosInfo.y == posInfo.y) &&
                board[selectedInd] != 0 &&
                board[selectedInd] == board[i];
        }
    }

    enum StyleState {
        Fixed,
        Normal,
        Selected,
        Solved,
    }

    function keydown(e: KeyboardEvent) {
        if (solved) return;
        if (selectedInd == -1) return;
        if (e.key == "Enter") {
            selectedInd = -1;
            updateCellStyles();
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
        checkDone();
        updateCellStyles();
    }

    function checkDone() {
        let c = board.filter((x) => x != 0).length;
        if (c == 81 && checkSolvable(board) == 1) {
            solved = true;
        }
    }
</script>

<h1 class="my-10 text-5xl font-mono text-center">Sudoku</h1>
{#if inited}
    <div class="max-w-2xl mx-auto">
        <div class="w-4/5 mx-auto relative">
            <div class="grid grid-cols-9 inset-0 select-none">
                {#each Array(81) as _, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="aspect-square grid place-items-center border filter border-slate-900"
                        class:bg-blue-300={styleStates[i] == StyleState.Fixed}
                        class:bg-blue-200={styleStates[i] == StyleState.Normal}
                        class:hover:bg-blue-100={styleStates[i] ==
                            StyleState.Normal}
                        class:bg-blue-500={styleStates[i] ==
                            StyleState.Selected}
                        class:hover:bg-blue-400={styleStates[i] ==
                            StyleState.Selected}
                        class:hover:cursor-pointer={styleStates[i] ==
                            StyleState.Normal ||
                            styleStates[i] == StyleState.Selected}
                        class:bg-green-200={styleStates[i] == StyleState.Solved}
                        class:hue-rotate-30={interest[i] && !conflict[i]}
                        class:saturate-200={interest[i] && !conflict[i]}
                        class:hue-rotate-[120deg]={conflict[i]}
                        class:saturate-75={conflict[i]}
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
            {#if solved}
                <div
                    class="grid grid-rows-3 absolute inset-0 p-4 place-items-center bg-[rgb(0,0,0,0.3)]"
                    transition:fade
                >
                    <span class="text-7xl">You won</span>
                    <button
                        class="bg-blue-800 px-4 py-3 text-2xl rounded-md"
                        on:click={() => solved && restart()}>New game</button
                    >
                </div>
            {/if}
        </div>
    </div>
{:else}
    <div>Loading board...</div>
{/if}

<style lang="postcss">
</style>
