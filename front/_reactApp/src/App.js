import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import GeoLocBtn from './components/GeoLocBtn'
import SensorsMarkers from './components/SensorsMarkers'

class App extends Component {
    constructor() {
        super()
        this.state = {
            lat: 51.919438,
            lng: 19.145136,
            zoom: 5
        }
    }
    myGeoLocation = () => {
        const onSuccess = (pos) => {
            this.setState({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                zoom: 13
            });
            this.refs.map.leafletElement.flyTo([pos.coords.latitude, pos.coords.longitude], 13)
        }
        const onError = (error) => {
            this.setState({
                lat: 50.3,
                lng: 19.166667
            })
            console.error('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    componentDidMount() {
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div>
                <Map ref='map' center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            MOJA LOKALIZACJA
                        </Popup>
                    </Marker>
                    <SensorsMarkers />
                </Map>
                <GeoLocBtn myGeoLocation={this.myGeoLocation} />
            </div>
        );
    }
}

export default App;
