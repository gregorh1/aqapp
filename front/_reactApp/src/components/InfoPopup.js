import React from 'react';

const InfoPopup = (props) => {
    const { sensorInfo, isPopupOpen } = props;

    if (isPopupOpen && sensorInfo) {
        return (
            <div className="is-infoPopup" >
                <div className="card">
                    <div className="card-header">
                        {sensorInfo.current.indexes[0].description}
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item">
                            {sensorInfo.current.indexes[0].description} <br></br>
                            {sensorInfo.current.indexes[0].advice}
                        </li>
                        <li className="list-group-item">

                        </li>
                        <li className="list-group-item">

                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    else {
        return null
    }
}
export default InfoPopup;
