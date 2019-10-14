import React from 'react';

export default function GeoLocBtn(props) {
    return (
        <span className='is-geoLocBtn' onClick={props.myGeoLocation}>
            <svg width="40" height="40" viewBox="0 0 561 561"><path d="M280.5 178.5c-56.1 0-102 45.9-102 102s45.9 102 102 102 102-45.9 102-102-45.9-102-102-102zM507.45 255C494.7 147.9 410.55 63.75 306 53.55V0h-51v53.55C147.9 63.75 63.75 147.9 53.55 255H0v51h53.55C66.3 413.1 150.45 497.25 255 507.45V561h51v-53.55C413.1 494.7 497.25 410.55 507.45 306H561v-51h-53.55zM280.5 459C181.05 459 102 379.95 102 280.5S181.05 102 280.5 102 459 181.05 459 280.5 379.95 459 280.5 459z"></path></svg>
        </span>
    );
}
