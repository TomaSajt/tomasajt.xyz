<script lang="ts">
    import type { PageData } from "./$types";
    import FasArrowUpLong from "~icons/fa6-solid/arrow-up-long";
    export let data: PageData;
    $: weatherInfo = data.weatherInfo;
    $: forecastInfo = data.forecastInfo;

    $: forecasts = forecastInfo.list.map((x) => ({
        date: new Date(x.dt_txt + "Z"),
        temp: x.main.temp,
        desc: x.weather[0].description,
        icon: x.weather[0].icon,
    }));

    const months = [
        "Jan",
        "Feb",
        "Márc",
        "Ápr",
        "Máj",
        "Jún",
        "Júl",
        "Aug",
        "Szept",
        "Okt",
        "Nov",
        "Dec",
    ];

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
            <div
                class="p-4 border border-black w-100 rounded-lg bg-slate-400 w-60"
            >
                <div class="text-2xl text-center">
                    {capitalize(w.description)}
                </div>
                <img
                    src="https://openweathermap.org/img/wn/{w.icon}@4x.png"
                    alt=""
                />
            </div>
        {/each}
    </div>
    <div>
        <div class="p-4">
            <FasArrowUpLong style={`rotate: ${weatherInfo.wind.deg}deg`} />
        </div>
        <div>
            Szélirány: {getWindDirStr(weatherInfo.wind.deg)} ({weatherInfo.wind
                .deg}°)
        </div>
        <div>Szél sebesség: {weatherInfo.wind.speed} m/s</div>
    </div>
    <div class="mt-8">
        <div>5 napos előrejelzés</div>
        <div class="flex overflow-x-scroll gap-2">
            {#each forecasts as forecast}
                <div
                    class="border-black border-2 h-80 w-40 flex-shrink-0 flex flex-col items-center rounded-lg bg-blue-300"
                >
                    <img
                        src="https://openweathermap.org/img/wn/{forecast.icon}@4x.png"
                        alt=""
                    />
                    <div>{capitalize(forecast.desc)}</div>
                    <div>
                        {months[forecast.date.getMonth()]}
                        {forecast.date.getDate()}.
                    </div>
                    <div>
                        {forecast.date.getHours()}:00
                    </div>
                    <div>{forecast.temp} °C</div>
                </div>
            {/each}
        </div>
    </div>
</div>