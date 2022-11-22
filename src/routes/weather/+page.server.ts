import type { PageServerLoad } from './$types'
import { WEATHER_API_KEY } from '$env/static/private'

type WeatherInfo = {
    coord: {
        lon: number
        lat: number
    },
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level: number
        grnd_level: number
    },
    visibility: number
    wind: {
        speed: number
        deg: number
        gust: number
    },
    rain: {
        "1h": number
    },
    clouds: {
        all: number
    },
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    },
    timezone: number
    id: number
    name: string
    cod: number
}

export const load: PageServerLoad = async ({ params, getClientAddress }) => {
    const lat = '47.497913'
    const lon = '19.040236'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    const weatherInfo = await fetch(url).then(r => r.json()) as WeatherInfo;

    return {
        weatherInfo: weatherInfo,
        xd: getClientAddress()
    }
}