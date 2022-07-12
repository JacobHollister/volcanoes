import { useFetch } from "./useFetch"

const BASE_URL = "http://localhost:5000"

export const useFetchVolcano = ( volcanoID, token ) => {
    const url = `/api/volcano/${volcanoID}`
    const headers = token ? {'Authorization': `Bearer ${token}`} : null

    const config = {
        url,
        method: 'get',
        headers, 
    }
    
    return useFetch(url, config)
}

export const useFetchVolcanoes = (country, populatedWithin) => {
    const querieString = `?country=${country}&${(populatedWithin !== "none") ? `populatedWithin=${populatedWithin}` : ""}`
    const url = "/api/volcanoes" + querieString

    const config = {
        url,
        method: 'get'
    }

    return useFetch(url, config)
}

export const useFetchCountries = () => {
    const url = '/api/countries'

    const config = {
        url,
        method: 'get'
    }

    return useFetch(url, config)
}