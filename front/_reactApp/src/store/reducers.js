import {
    SET_POSITION,
    GET_MY_GEOLOCATION,
    POPUP_HIDE,
    SET_SENSOR_DATA,
    GET_SENSORS_LIST
} from './actions'

const initialState = {
    position: [51.919438, 19.145136],
    zoom: 5,
    myLocation: null,
    sensors: [],
    isPopupOpen: false,
    currentSensorInfo: null
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSITION:
            return {
                ...state,
                position: action.payload.position,
                zoom: action.payload.zoom
            }
        case GET_MY_GEOLOCATION:
            return {
                ...state,
                position: action.payload.position,
                zoom: action.payload.zoom,
                myLocation: action.payload.myLocation
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
            return {...state, sensors: action.payload}

        default:
            return state;
    }
}
export default mapReducer;
