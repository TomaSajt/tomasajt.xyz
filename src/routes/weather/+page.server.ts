import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { WEATHER_API_KEY } from "$env/static/private"
import type { IpInfo } from "./ip_types"
import type { WeatherInfo } from "./weather_types"
import type { ForecastResponse as ForecastInfo } from "./forecast_types"

export const load: PageServerLoad = async ({ getClientAddress, url }) => {
    const latParam = url.searchParams.get('lat')
    const lonParam = url.searchParams.get('lon')
    const ip = getClientAddress();
    if (!latParam || !lonParam) throw redirect(302, await getRedirectRouteBasedOnIp(ip));
    const lon = parseFloat(lonParam)
    const lat = parseFloat(latParam)
    if (isNaN(lon) || isNaN(lat)) throw redirect(302, await getRedirectRouteBasedOnIp(ip));
    const weatherInfo = await getWeatherInfo(lat, lon)
    const forecastInfo = await getForecastInfo(lat, lon)
    return {
        weatherInfo: weatherInfo,
        forecastInfo: forecastInfo
    }


}

async function getWeatherInfo(lat: number, lon: number) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=hu&appid=${WEATHER_API_KEY}`
    const r = await fetch(weatherApiUrl)
    return await r.json() as WeatherInfo
}

async function getForecastInfo(lat: number, lon: number) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=hu&appid=${WEATHER_API_KEY}`
    const r = await fetch(weatherApiUrl)
    return await r.json() as ForecastInfo
}

async function getRedirectRouteBasedOnIp(ip: string) {
    const ipApiUrl = `http://ip-api.com/json/${ip}`
    const ipinfo = await fetch(ipApiUrl).then(r => r.json()) as IpInfo
    const lat = ipinfo.lat ?? 47.497913;
    const lon = ipinfo.lon ?? 19.040236;
    return `/weather?lat=${lat}&lon=${lon}`;
}