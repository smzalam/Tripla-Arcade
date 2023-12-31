import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEVHOST : import.meta.env.VITE_PRODHOST,
})

export const getGames = async () => {
    const response = await api.get('/games/all')
    console.log(response.data)
    return response.data
}
