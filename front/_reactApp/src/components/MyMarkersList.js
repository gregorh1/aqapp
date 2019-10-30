import React, { Fragment } from 'react'
import { Marker, Popup, } from 'react-leaflet'
import L from 'leaflet'

const sensorIcon = new L.Icon({
    iconUrl: require('../../assets/circle.svg'),
    popupAnchor: [-3, 0],
    iconSize: [8, 8],
    className: 'is-sensor'
})

const MyPopupMarker = ({ content, position, sensorId, getSensorData }) => (
    <Marker position={position}
        onclick={() => { getSensorData(sensorId) }}
        icon={sensorIcon}
    >
        <Popup closeButton={false} className="is-sensorPopup">
            {content}
        </Popup>
    </Marker>
)

const MyMarkersList = ({ markers, getSensorData }) => {
    const items = markers.map(({ key, ...props }) => (
        <MyPopupMarker key={key} {...props} getSensorData={getSensorData} />
    ))
    return <Fragment>{items}</Fragment>
}
export default MyMarkersList
