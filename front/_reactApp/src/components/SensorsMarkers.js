import React, { Component, Fragment } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const markerIcon = new L.Icon({
    iconUrl: require('../../assets/circle.svg'),
    // iconRetinaUrl: require('../assets/suitcaseIcon.svg'),
    // iconAnchor: [20, 20],
    popupAnchor: [0, -20],
    iconSize: [20, 20],
    // shadowUrl: '../assets/marker-shadow.png',
    // shadowSize: [29, 40],
    // shadowAnchor: [7, 40],
    className: 'is-pointShadow'
  })

const MyPopupMarker = ({ content, position }) => (
    <Marker position={position} 
    // icon={markerIcon}
    >
        <Popup>{content}</Popup>
    </Marker>
)

const MyMarkersList = ({ markers }) => {
    const items = markers.map(({ key, ...props }) => (
        <MyPopupMarker key={key} {...props} />
    ))
    return <Fragment>{items}</Fragment>
}

export default class SensorsMarkers extends Component {
    state = {
        openaq: [],
        airly: []
    }

    getSensorsFromApi = (slug) => {
        fetch(`http://localhost:3002/${slug}`) // works with cross-origin allowed
            .then(resp => {
                return resp.json()
            })
            .then(respJson => {
                console.log(respJson);
                this.setState({
                    [slug]: respJson
                })
            })
    }

    componentDidMount() {
        this.getSensorsFromApi('openaq')
        this.getSensorsFromApi('airly')
    }

    render() {
        return (
            <div>
                <MyMarkersList markers={this.state.openaq} />
                <MyMarkersList markers={this.state.airly} />
            </div>
        )
    }
}

// markers: [
//     { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
//     { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
//     { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' },
//   ],