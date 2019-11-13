export const SET_POSITION = 'SET_POSITION';
export const GET_MY_GEOLOCATION = 'GET_MY_GEOLOCATION';
export const POPUP_HIDE = 'POPUP_HIDE';
export const SET_SENSOR_DATA = 'SET_SENSOR_DATA';
export const GET_SENSORS_LIST = 'GET_SENSORS_LIST';
export const MY_GEOLOCATION_DENIAL = 'MY_GEOLOCATION_DENIAL';

export const NOT_ASKED_YET = 'NOT_ASKED_YET'
export const NOT_PERMITED = 'NOT_PERMITED'
export const GRANTED = 'GRANTED'

export const setPosition = data => {
    return {
        type: SET_POSITION,
        payload: {
            position: [
                Number(data.position[0]),
                Number(data.position[1])
            ],
            zoom: data.zoom
        }
    };
};
export const getMyGeolocation = data => {
    return {
        type: GET_MY_GEOLOCATION,
        payload: {
            position: [
                Number(data.position[0]),
                Number(data.position[1])
            ],
            zoom: data.zoom,
            myLocation: data.myLocation,
            myLocationPermission: data.myLocationPermission
        }
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
export const myGeolocationDenial = data => {
    return {
        type: MY_GEOLOCATION_DENIAL,
        payload: data
    }
}
