import {
    GET_MY_GEOLOCATION,
    POPUP_HIDE,
    SET_SENSOR_DATA,
    GET_SENSORS_LIST
} from './actions'

const initialState = {
    lat: 51.919438,
    lng: 19.145136,
    zoom: 5,
    isPopupOpen: false,
    data: [],
    currentSensorInfo: null
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_GEOLOCATION:
            return {
                ...state,
                lat: action.payload.lat,
                lng: action.payload.lng,
                zoom: action.payload.zoom
            }
        case POPUP_HIDE:
            return { ...state, isPopupOpen: false }
        case SET_SENSOR_DATA:
            return {
                ...state,
                currentSensorInfo: action.payload,
                isPopupOpen: true
            }
        case GET_SENSORS_LIST:
            return {...state, data: action.payload}

        default:
            return state;
    }
}
export default mapReducer;
