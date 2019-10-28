import React, { Component } from 'react'
import { connect } from 'react-redux'

import InfoPopup from './InfoPopup'
import MyMarkersList from './MyMarkersList'
import { setSensorData } from '../store/actions'
class SensorsMarkers extends Component {
    getSensorData = (sensorId) => {
        const url = new URL('https://airapi.airly.eu/v2/measurements/installation');
        const headers = {
            Accept: 'application/json',
            apikey: 'SH2BH7ThG89LH94gAAJX782mRnoREkZP'
        };
        const params = {
            installationId: sensorId,
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url, { headers })
            .then(resp => {
                return resp.json()
            })
            .then(respJson => {
                this.props.setSensorData(respJson)
            })
    }

    render() {
        return (
            <div>
                <MyMarkersList markers={this.props.sensors} getSensorData={this.getSensorData} />
                <InfoPopup sensorInfo={this.props.currentSensorInfo} isPopupOpen={this.props.isPopupOpen} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
};
const mapDispatchToProps = dispatch => {
    return {
        setSensorData: sensors => dispatch(setSensorData(sensors)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SensorsMarkers);
