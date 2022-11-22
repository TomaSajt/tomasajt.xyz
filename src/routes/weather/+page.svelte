<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    let weatherInfo = data.weatherInfo;
    let xd = data.xd;
</script>

<div>Jelenlegi időjárás itt: {weatherInfo.name}</div>
<div>Hőmérséklet: {weatherInfo.main.temp} °C</div>
<div>Minimum hőmérséklet: {weatherInfo.main.temp_min} °C</div>
<div>Maximum hőmérséklet: {weatherInfo.main.temp_max} °C</div>
<div>Páratartalom: {weatherInfo.main.humidity}%</div>
<div>Eső az utolsó órában: {weatherInfo.rain["1h"]}mm</div>
<div>Felhősség: {weatherInfo.clouds.all}%</div>
<div>{xd}</div>
<pre>{JSON.stringify(weatherInfo, null, 2)}</pre>
