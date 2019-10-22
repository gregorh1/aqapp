import React, { Component } from 'react'
import { connect } from 'react-redux'

import InfoPopup from './InfoPopup'
import MyMarkersList from './MyMarkersList'
import { setSensorData, getSensorsList } from '../store/actions'
class SensorsMarkers extends Component {
    getSensorData = (sensorId) => {
        const url = new URL('https://airapi.airly.eu/v2/measurements/installation');
        const params = {
            installationId: sensorId,
            indexType: 'AIRLY_CAQI',
            indexPollutant: 'PM'
        };
        const headers = {
            Accept: 'application/json',
            apikey: 'SH2BH7ThG89LH94gAAJX782mRnoREkZP'
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url, { headers })
            .then(resp => {
                return resp.json()
            })
            .then(respJson => {
                this.props.setSensorData(respJson)
            })
    }

    getSensorsFromApi = (slug) => {
        fetch(`http://localhost:3002/${slug}`) // works with cross-origin allowed
            .then(resp => {
                return resp.json()
            })
            .then(respJson => {
                this.props.getSensorsList(respJson)
            })
    }

    componentDidMount() {
        const bond = {
            latMin: '50.162097',
            latMax: '50.445301',
            lngMin: '19.064042',
            lngMax: '19.307412'
        }
        this.getSensorsFromApi(`data?latMax=${bond.latMax}&latMin=${bond.latMin}&lngMax=${bond.lngMax}&lngMin=${bond.lngMin}`)
    }

    render() {
        return (
            <div>
                <MyMarkersList markers={this.props.data} getSensorData={this.getSensorData} />
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
        setSensorData: data => dispatch(setSensorData(data)),
        getSensorsList: currentSensorInfo => dispatch(getSensorsList(currentSensorInfo))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SensorsMarkers);
