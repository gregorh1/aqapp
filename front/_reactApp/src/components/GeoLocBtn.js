import React, { useState, useEffect } from 'react';

import { NOT_ASKED_YET, NOT_PERMITED, GRANTED } from '../store/actions'

const GeoLocBtn = (props) => {

    const [loaderClass, setLoaderClass] = useState('');

    useEffect(() => {
        if (props.myLocationPermission !== NOT_ASKED_YET) {
            setLoaderClass('')
        }
    })

    let iconColor = '#555';
    if (props.myLocationPermission === NOT_PERMITED) {
        iconColor = '#ababab';
    } else if (props.myLocationPermission === GRANTED) {
        iconColor = '#3d7cc9';
    }

    const onClickHandler = () => {
        setLoaderClass('is-anim');
        props.myGeoLocationOnclick()
    }

    return (
        <span className='is-geoLocBtn is-anim' onClick={onClickHandler}>
            <span>
                <svg className={loaderClass} width="24" height="24" viewBox="0 0 561 561" xmlns="http://www.w3.org/2000/svg">
                    <path
                        style={{ fill: iconColor }}
                        d="M280.5 178.5c-56.1 0-102 45.9-102 102s45.9 102 102 102 102-45.9 102-102-45.9-102-102-102zM507.45 255C494.7 147.9 410.55 63.75 306 53.55V0h-51v53.55C147.9 63.75 63.75 147.9 53.55 255H0v51h53.55C66.3 413.1 150.45 497.25 255 507.45V561h51v-53.55C413.1 494.7 497.25 410.55 507.45 306H561v-51h-53.55zM280.5 459C181.05 459 102 379.95 102 280.5S181.05 102 280.5 102 459 181.05 459 280.5 379.95 459 280.5 459z">
                    </path>
                </svg>
            </span>
        </span>
    );
}
export default GeoLocBtn;
