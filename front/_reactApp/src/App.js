import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import { connect } from 'react-redux'

import GeoLocBtn from './components/GeoLocBtn'
import SensorsMarkers from './components/SensorsMarkers'
import { getMyGeolocation, popupHide } from './store/actions'

const myLocIcon = new L.Icon({
    iconUrl: require('../assets/circle.svg'),
    popupAnchor: [0, -20],
    iconSize: [10, 10],
    className: 'is-myLoc'
})
class App extends Component {
    myGeoLocation = () => {
        const onSuccess = (pos) => {
            this.props.getMyGeolocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                zoom: 13
            })
            this.refs.map.leafletElement.flyTo([pos.coords.latitude, pos.coords.longitude], 11)
        }
        const onError = (error) => {
            this.props.getMyGeolocation({
                lat: 50.3,
                lng: 19.166667
            })
            console.error('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    render() {
        const position = [this.props.lat, this.props.lng];
        return (
            <div>
                <Map
                    ref='map'
                    center={position}
                    zoom={this.props.zoom}
                    onpopupclose={this.props.popupHide}
                    animate={true}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={myLocIcon} />
                    <SensorsMarkers />
                </Map>
                <GeoLocBtn myGeoLocation={this.myGeoLocation} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};
const mapDispatchToProps = dispatch => {
    return {
        getMyGeolocation: location => dispatch(getMyGeolocation(location)),
        popupHide: () => dispatch(popupHide())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
