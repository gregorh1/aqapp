import React from 'react';
import icon from '../../assets/geo-icon.svg'

const GeoLocBtn = (props) => {
    return (
        <span className='is-geoLocBtn' onClick={props.myGeoLocation}>
            <span>
                <img src={icon} alt="Zlokalizuj mnie"/>
            </span>
        </span>
    );
}
export default GeoLocBtn;
