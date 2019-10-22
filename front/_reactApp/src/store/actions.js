export const GET_MY_GEOLOCATION = 'GET_MY_GEOLOCATION';
export const POPUP_HIDE = 'POPUP_HIDE';
export const SET_SENSOR_DATA = 'SET_SENSOR_DATA';
export const GET_SENSORS_LIST = 'GET_SENSORS_LIST';

export const getMyGeolocation = location => {
    return {
        type: GET_MY_GEOLOCATION,
        payload: location
    };
};
export const popupHide = () => {
    return {
        type: POPUP_HIDE
    }
}
export const setSensorData = data => {
    return {
        type: SET_SENSOR_DATA,
        payload: data
    }
}
export const getSensorsList = data => {
    return {
        type: GET_SENSORS_LIST,
        payload: data
    }
}
