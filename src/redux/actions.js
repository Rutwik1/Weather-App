import axios from "axios";
import { weatherAppAPI } from "../helpers/API";
import { myToast } from "../helpers/extraFunctions";
import { setItem } from "../helpers/sessionStorage";
import { GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS } from "./actionTypes";

export const getDataLoading = () => ({
    type: GET_DATA_LOADING
});

export const getDataSuccess = (payload) => ({
    type: GET_DATA_SUCCESS,
    payload
});

export const getDataError = () => ({
    type: GET_DATA_ERROR
});

export const getWeatherByLocation = (toast) => async (dispatch) => {
    const success = async (position) => {
        try {
            const { latitude, longitude } = position.coords;
            dispatch(getDataLoading());
            
            const weatherResponse = await axios.get(`/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAppAPI}`);
            const { lon, lat } = weatherResponse.data.coord;
            
            const forecastResponse = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`);
            
            const payload = {
                weatherData: weatherResponse.data,
                forcastData: forecastResponse.data.daily
            };

            dispatch(getDataSuccess(payload));
            setItem("weather", payload);
            myToast(toast, "Your location weather updated", "success");
        } catch (err) {
            console.error(err);
            dispatch(getDataError());
            myToast(toast, "Failed to fetch weather data", "error");
        }
    };

    const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        myToast(toast, "Please turn on your location", "error");
    };

    navigator.geolocation.getCurrentPosition(success, error);
};

export const getWeatherByCity = (city, toast) => async (dispatch) => {
    try {
        dispatch(getDataLoading());
        
        const weatherResponse = await axios.get(`/weather?q=${city}&appid=${weatherAppAPI}`);
        const { lon, lat } = weatherResponse.data.coord;
        
        const forecastResponse = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`);
        
        const payload = {
            weatherData: weatherResponse.data,
            forcastData: forecastResponse.data.daily
        };

        dispatch(getDataSuccess(payload));
        setItem("weather", payload);
        myToast(toast, "City weather data updated", "success");
    } catch (err) {
        console.error(err);
        dispatch(getDataError());
        myToast(toast, "City weather data doesn't exist", "error");
    }
};

export const syncData = (city, toast) => async (dispatch) => {
    try {
        const weatherResponse = await axios.get(`/weather?q=${city}&appid=${weatherAppAPI}`);
        const { lon, lat } = weatherResponse.data.coord;
        
        const forecastResponse = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`);
        
        const payload = {
            weatherData: weatherResponse.data,
            forcastData: forecastResponse.data.daily
        };

        dispatch(getDataSuccess(payload));
        setItem("weather", payload);
        myToast(toast, "Data sync successfully", "success");
    } catch (err) {
        console.error(err);
        dispatch(getDataError());
        myToast(toast, "Failed to sync weather data", "error");
    }
};