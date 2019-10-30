import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import { connect } from 'react-redux'

import { setPosition, getMyGeolocation, popupHide, getSensorsList, myGeolocationDenial, setSensorData } from './store/actions'
import GeoLocBtn from './components/GeoLocBtn'
import SensorsMarkers from './components/SensorsMarkers'
import Search from './components/Search';

import { NOT_PERMITED, GRANTED } from './store/actions'

const myLocIcon = new L.Icon({
    iconUrl: require('../assets/circle.svg'),
    popupAnchor: [0, -20],
    iconSize: [10, 10],
    className: 'is-myLoc'
})
class App extends Component {

    componentDidMount() {
        this.myGeoLocation();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.position !== this.props.position) {
            this.getSensorsFromApi()
        }
    }

    myGeoLocation = () => {
        const onSuccess = (pos) => {
            this.props.getMyGeolocation({
                position: [pos.coords.latitude, pos.coords.longitude,],
                zoom: 15,
                myLocation: [pos.coords.latitude, pos.coords.longitude,],
                myLocationPermission: GRANTED,
            })
            this.refs.map.leafletElement.closePopup()
        }
        const onError = (error) => {
            this.props.myGeolocationDenial({
                myLocationPermission: NOT_PERMITED,
                position: this.props.position
            })
            console.error(error);
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    getPositionFromSearch = (latLng, boundingbox) => {
        this.props.setPosition({ position: latLng, zoom: 13 })
    }

    getSensorsFromApi = () => {
        const backend = {
            local: 'http://localhost:3002/data',
            heroku: 'https://aq-app-backend.herokuapp.com/data'
        }
        const { _southWest, _northEast } = this.refs.map.leafletElement.getBounds();
        const params = {
            latMin: _southWest.lat,
            latMax: _northEast.lat,
            lngMin: _southWest.lng,
            lngMax: _northEast.lng
        }
        const url = new URL(backend.heroku) // if local change to local

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url)
            .then(resp => {
                return resp.json()
            })
            .then(respJson => {
                this.props.getSensorsList(respJson)
            })
    }

    onZoomEndHandler = () => {
        this.props.setPosition({
            position: this.props.position,
            zoom: this.refs.map.leafletElement.getZoom()
        })
    }

    onMoveEndHandler = () => {
        const { lat, lng } = this.refs.map.leafletElement.getCenter()
        const position = [lat, lng]
        this.props.setPosition({
            position,
            zoom: this.props.zoom
        })
    }

    render() {
        return (
            <div className={'is-zoom_' + this.props.zoom}>
                <Map
                    ref='map'
                    center={this.props.position}
                    zoom={this.props.zoom}
                    animate={true}
                    zoomControl={false}
                    onPopupClose={this.props.popupHide}
                    onZoomEnd={this.onZoomEndHandler}
                    onDragEnd={this.onMoveEndHandler}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.props.myLocation && <Marker position={this.props.myLocation} icon={myLocIcon} />}
                    <SensorsMarkers />
                </Map>
                <GeoLocBtn myGeoLocationOnclick={this.myGeoLocation} myLocationPermission={this.props.myLocationPermission} />
                <Search getPositionFromSearch={this.getPositionFromSearch} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};
const mapDispatchToProps = dispatch => {
    return {
        setPosition: location => dispatch(setPosition(location)),
        getMyGeolocation: location => dispatch(getMyGeolocation(location)),
        popupHide: () => dispatch(popupHide()),
        getSensorsList: currentSensorInfo => dispatch(getSensorsList(currentSensorInfo)),
        myGeolocationDenial: data => dispatch(myGeolocationDenial(data)),
        setSensorData: data => dispatch(setSensorData(data))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
