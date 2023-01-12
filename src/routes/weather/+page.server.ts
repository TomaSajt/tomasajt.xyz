import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import type { IpInfo, WeatherInfo } from "./custom_types"
import { WEATHER_API_KEY } from "$env/static/private"

export const load: PageServerLoad = async ({ getClientAddress, url }) => {
    const latParam = url.searchParams.get('lat')
    const lonParam = url.searchParams.get('lon')
    const ip = getClientAddress();
    if (!latParam || !lonParam) throw redirect(302, await getRedirectRouteBasedOnIp(ip));
    const lon = parseFloat(lonParam)
    const lat = parseFloat(latParam)
    if (isNaN(lon) || isNaN(lat)) throw redirect(302, await getRedirectRouteBasedOnIp(ip));
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=hu&appid=${WEATHER_API_KEY}`
    const weatherInfo = await fetch(weatherApiUrl).then(r => r.json()) as WeatherInfo;
    console.log(weatherInfo)
    return {
        weatherInfo: weatherInfo
    }
}

async function getRedirectRouteBasedOnIp(ip: string) {
    const ipApiUrl = `http://ip-api.com/json/${ip}`
    const ipinfo = await fetch(ipApiUrl).then(r => r.json()) as IpInfo
    const lat = ipinfo.lat ?? 60.541082;
    const lon = ipinfo.lon ?? 8.176364;
    return `/weather?lat=${lat}&lon=${lon}`;
}