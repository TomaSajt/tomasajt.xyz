<script lang="ts">
    let board = Array(81).fill(0);
    let fixed = Array(81).fill(false);
    function onClickSquare(i: number) {
        if (fixed[i]) return;
        let x = i % 9;
        let y = (i / 9) | 0;
        console.log(`${x} ${y}`);
        board[i]++;
        board[i] %= 10;
    }
</script>

<div class="max-w-2xl mx-auto">
    <div class="grid grid-cols-9 mt-10 w-4/5 mx-auto select-none">
        {#each board as val, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="aspect-square grid place-items-center bg-red-300 outline-1 outline"
                class:bg-red-600={fixed[i]}
                on:click={() => onClickSquare(i)}
            >
                {val}
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
</style>
