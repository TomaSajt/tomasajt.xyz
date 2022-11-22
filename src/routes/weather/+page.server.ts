import type { PageServerLoad } from './$types'
import { WEATHER_API_KEY } from '$env/static/private'
import type { IpInfo, WeatherInfo } from './custom_types'


export const load: PageServerLoad = async ({ params, getClientAddress }) => {
    const url0 = `http://ip-api.com/json/${getClientAddress()}`
    const ipinfo = await fetch(url0).then(r => r.json()) as IpInfo
    const lat = ipinfo.lat ?? '47.497913'
    const lon = ipinfo.lon ?? '19.040236'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=hu&appid=${WEATHER_API_KEY}`
    const weatherInfo = await fetch(url).then(r => r.json()) as WeatherInfo;

    return {
        weatherInfo: weatherInfo
    }
}