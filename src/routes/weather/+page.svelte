<script lang="ts">
    import Fa from "svelte-fa";
    import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
    import type { PageData } from "./$types";
    export let data: PageData;
    let weatherInfo = data.weatherInfo;
    function capitalize(str: string) {
        str = str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function getWindDirStr(deg: number) {
        let n = Math.round(deg / 45);
        return ["É", "ÉK", "K", "DK", "D", "DNY", "NY", "ÉNY", "É"][n];
    }
</script>

<h1 class="text-4xl text-center">Hihetetlenül pontos időjárási adatok</h1>
<div class="max-w-4xl p-4 mx-auto bg-stone-300">
    <div class="py-4">
        <div class="text-2xl">Időjárás itt: {weatherInfo.name}</div>
        <div>({weatherInfo.coord.lat}, {weatherInfo.coord.lon})</div>
    </div>
    <div>Hőmérséklet: {weatherInfo.main.temp} °C</div>
    <div>Minimum hőmérséklet: {weatherInfo.main.temp_min} °C</div>
    <div>Maximum hőmérséklet: {weatherInfo.main.temp_max} °C</div>
    <div>Páratartalom: {weatherInfo.main.humidity}%</div>
    <div>Eső az elmúlt órában: {weatherInfo.rain?.["1h"]} mm</div>
    <div>Felhősség: {weatherInfo.clouds.all}%</div>
    <div>Légnyomás: {weatherInfo.main.pressure / 10} kPa</div>
    <div class="flex py-4 gap-4">
        {#each weatherInfo.weather as w}
            <div class="p-4 border border-black w-100 rounded-lg bg-slate-400 w-60">
                <div class="text-2xl text-center">{capitalize(w.description)}</div>
                <img
                    src="http://openweathermap.org/img/wn/{w.icon}@4x.png"
                    alt=""
                />
            </div>
        {/each}
    </div>
    <div>
        <div class="p-4">
            <Fa
                icon={faArrowDownLong}
                rotate={weatherInfo.wind.deg}
                scale="3x"
            />
        </div>
        <div>
            Szélirány: {getWindDirStr(weatherInfo.wind.deg)} ({weatherInfo.wind
                .deg}°)
        </div>
        <div>Szél sebesség: {weatherInfo.wind.speed} m/s</div>
    </div>
</div>
<pre class="text-[8px]">{JSON.stringify(weatherInfo, null, 2)}</pre>
