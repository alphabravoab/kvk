import axios, { AxiosResponse } from 'axios'

const url = 'https://617c09aad842cf001711c200.mockapi.io/v1/companies'

// generic http client call so these can be switched without breaking the app. App only expects promises.
export function http_get<T>(params?: string): Promise<AxiosResponse<T>> { 
    const request = `${url}${params ?? null}`
    return axios.get(request)
}
