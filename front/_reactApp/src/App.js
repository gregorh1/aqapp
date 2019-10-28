import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import { connect } from 'react-redux'

import { setPosition, getMyGeolocation, popupHide, getSensorsList } from './store/actions'
import GeoLocBtn from './components/GeoLocBtn'
import SensorsMarkers from './components/SensorsMarkers'
import Search from './components/Search';

const backend = {
    local: 'http://localhost:3002/',
    heroku: 'https://aq-app-backend.herokuapp.com/'
}

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
            this.updateSensorsMarkers()
        }
    }

    myGeoLocation = () => {
        const onSuccess = (pos) => {
            this.props.getMyGeolocation({
                position: [pos.coords.latitude, pos.coords.longitude,],
                zoom: 15,
                myLocation: [pos.coords.latitude, pos.coords.longitude,]
            })
            this.refs.map.leafletElement.flyTo([pos.coords.latitude, pos.coords.longitude], 11)
        }
        const onError = (error) => {
            this.props.setPosition({ position: [50.3, 19.166667] })
            console.error('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    getPositionFromSearch = (latLng, boundingbox) => {
        this.props.setPosition({ position: latLng, zoom: 13 })
    }

    getSensorsFromApi = (slug) => {
        fetch(backend.heroku + slug)
            .then(resp => {
                return resp.json()
            })
            .then(respJson => {
                this.props.getSensorsList(respJson)
            })
    }

    updateSensorsMarkers() {
        const bond = {
            latMin: this.props.position[0] - 0.25,
            latMax: this.props.position[0] + 0.25,
            lngMin: this.props.position[1] - 0.15,
            lngMax: this.props.position[1] + 0.15
        }
        this.getSensorsFromApi(`data?latMax=${bond.latMax}&latMin=${bond.latMin}&lngMax=${bond.lngMax}&lngMin=${bond.lngMin}`)
    }


    onDragendHandler = (e) => {
        this.props.setPosition({
            position: [
                e.target._latlng.lat,
                e.target._latlng.lng
            ]
        })
    }

    render() {
        return (
            <div>
                <Map
                    ref='map'
                    center={this.props.position}
                    zoom={this.props.zoom}
                    onpopupclose={this.props.popupHide}
                    animate={true}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={this.props.position} draggable={true}
                        onDragend={(e) => this.onDragendHandler(e)}
                    />
                    {this.props.myLocation &&
                        <Marker
                            position={this.props.myLocation}
                            icon={myLocIcon}
                        />}
                    <SensorsMarkers />
                </Map>
                <GeoLocBtn myGeoLocation={this.myGeoLocation} />
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
        getSensorsList: currentSensorInfo => dispatch(getSensorsList(currentSensorInfo))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
