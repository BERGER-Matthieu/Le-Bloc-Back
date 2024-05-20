import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export function authHttpHeader() {
    const apiKey = process.env.NAVITIA_KEY;
    const Base_url = "https://api.navitia.io/v1/";

    const axiosInstance = axios.create({
        baseURL: Base_url,
        headers: {
        'Authorization': apiKey,
        },
    });
    return axiosInstance
};