import React, { useState } from 'react';

import iconClose from '../../assets/img/close-icon.svg'
import texts from '../helpers/textContent'

const InfoPopup = (props) => {
    const { sensorInfo } = props;
    const indexes = sensorInfo.current.indexes[0];
    const values = sensorInfo.current.values;
    const standards = sensorInfo.current.standards;

    const [tooltip, setTooltip] = useState('');

    const tooltipContent = {
        caqi: texts.caqi,
        PM25: texts.pm25,
        PM10: texts.pm10,
        NO2: '',
        CO: ''
    }

    const detailInfo1 = standards.map((item) => {
        return (
            <li key={item.pollutant} className="list-group-item">
                <span className='is-label' onClick={() => setTooltip(tooltipContent[item.pollutant])}>{item.pollutant}</span>:&nbsp;
                        <span className="is-number">{item.percent}</span>
                % dopuszczalnej wartości
            </li>
        )
    })

    const detailInfo2 = values.map((item) => {
        if (item.name === 'TEMPERATURE') {
            return (
                <li key={item.name} className="list-group-item">
                    Temperatura: <span className="is-number">{item.value}</span> °C
                </li>
            )
        } else if (item.name === 'HUMIDITY') {
            return (
                <li key={item.name} className="list-group-item">
                    Wilgotność powietrza: <span className="is-number">{item.value}</span>%
                </li>
            )
        }
        return null
    })

    let content;
    if (indexes.value) {
        content = (
            <div>
                <div className="card-header" style={{ backgroundColor: indexes.color }}>
                    <div className="is-line1">
                        Wskaźnik&nbsp;
                            <span onClick={() => setTooltip(tooltipContent.caqi)} className="is-label">
                            CAQI
                            </span>:&nbsp;
                            <span className="is-index">
                            {indexes.value}
                        </span>
                    </div>
                    <div className="is-line2">
                        {indexes.description}
                    </div>
                    <div>
                        {indexes.advice}
                    </div>
                </div>
                <ul>
                    {detailInfo1}
                    {detailInfo2}
                </ul>
            </div>
        )
    } else {
        content = (
            <div className="card-header" style={{ backgroundColor: indexes.color }}>
                {indexes.description}
            </div>
        )
    }
    
    return (
        <div className="is-infoPopup" >
            {tooltip && <div className="card is-tooltip">
                <span onClick={() => setTooltip('')} className="is-closeTooltip">
                    <img src={iconClose} alt="zamknij"></img>
                </span>
                <div className="is-tooltip_content">
                    {tooltip}
                </div>
            </div>}
            <div className="card">
                {content}
            </div>
        </div>
    )
}

export default InfoPopup;
