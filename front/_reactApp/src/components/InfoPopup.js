import React from 'react';

const InfoPopup = (props) => {
    const { sensorInfo, isPopupOpen } = props;

    if (isPopupOpen && sensorInfo) {
        const indexes = sensorInfo.current.indexes[0];
        const values = sensorInfo.current.values;
        const standards = sensorInfo.current.standards;

        const detailInfo1 = standards.map((item) => {
            return (
                <li key={item.pollutant} className="list-group-item">
                    {item.pollutant}: {item.percent}% dopuszczalnej wartości
                </li>
            )
        })

        const detailInfo2 = values.map((item) => {
            if (item.name === 'TEMPERATURE') {
                return (
                    <li key={item.name} className="list-group-item">
                        Temperatura: {item.value} st. Celsjusza
                    </li>
                )
            } else if (item.name === 'HUMIDITY') {
                return (
                    <li key={item.name} className="list-group-item">
                        Wilgotność powietrza: {item.value}%
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
                        Wskaźnik CAQI: {indexes.value}, {indexes.description}<br></br>
                        {indexes.advice}
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
                <div className="card">
                    {content}
                </div>
            </div>
        )
    }
    else {
        return null
    }
}

export default InfoPopup;
