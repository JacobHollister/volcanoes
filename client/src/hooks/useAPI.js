import { useFetch } from "./useFetch"

const BASE_URL = "http://sefdb02.qut.edu.au:3001"

export const useFetchVolcano = ( volcanoID, token ) => {
    const url = `/volcano/${volcanoID}`
    const headers = token ? {'Authorization': `Bearer ${token}`} : null

    const config = {
        url: BASE_URL + url,
        method: 'get',
        headers, 
    }
    
    return useFetch(url, config)
}

export const useFetchVolcanoes = (country, populatedWithin) => {
    const querieString = `?country=${country}&${(populatedWithin !== "none") ? `populatedWithin=${populatedWithin}` : ""}`
    const url = "/volcanoes" + querieString

    const config = {
        url: BASE_URL + url,
        method: 'get'
    }

    return useFetch(url, config)
}

export const useFetchCountries = () => {
    const url = '/countries'

    const config = {
        url: BASE_URL + url,
        method: 'get'
    }

    return useFetch(url, config)
}