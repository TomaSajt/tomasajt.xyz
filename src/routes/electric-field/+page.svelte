<script lang="ts">
    type Particle = {
        pos: Point;
        charge: number;
    };
    type Point = [number, number];

    let particles: Particle[] = [
        { pos: [20, -50], charge: 1 },
        { pos: [35, 85], charge: 1 },
        { pos: [-30, 20], charge: 1 },
    ];

    let samplePoints = [...Array(21).fill(0).keys()].flatMap((i) =>
        [...Array(21).fill(0).keys()].map(
            (j) => [(i - 10) * 10, (j - 10) * 10] as Point
        )
    );
    console.log(samplePoints);
</script>

<div class="h-full">
    <div class="absolute top-1/2 left-1/2">
        {#each particles as particle}
            <div
                class="aspect-square rounded-full bg-red-500 absolute -translate-x-1/2 -translate-y-1/2"
                style="
                    width: {Math.abs(particle.charge) * 10}px ;
                    left: {particle.pos[0]}px;
                    top: {particle.pos[1]}px
                "
            />
        {/each}
        {#each samplePoints as point}
            <div
                class="aspect-square rounded-full bg-black absolute -translate-x-1/2 -translate-y-1/2"
                style="
                    width: 5px ;
                    left: {point[0]}px;
                    top: {point[1]}px
                "
            />
        {/each}
    </div>
</div>
