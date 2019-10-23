import React, { useState } from 'react'

import icon from '../../assets/search-icon.svg'

const Search = props => {

    const [userInput, setUserInput] = useState('');
    const [placesList, setPlacesList] = useState('');
    const [loader, setLoader] = useState(false);
    const [showList, setShowList] = useState(false)

    const hendleFind = (keyCode) => {
        if (keyCode === 13 && userInput.length) {
            setLoader(true);
            const url = new URL('https://nominatim.openstreetmap.org/search')
            const params = {
                q: userInput,
                format: 'json'
            }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(url)
                .then(resp => resp.json())
                .then(jsonResp => {
                    if (jsonResp.length === 0) {
                        setPlacesList([{
                            place_id: 1,
                            display_name: 'Brak wyników dla tego wyszukiwania'
                        }])
                    } else {
                        setPlacesList(jsonResp)
                    }
                    setLoader(false)
                })
        }
    }

    const handleListItemClick = (latLng, boundingbox = []) => {
        props.getPositionFromSearch(latLng, boundingbox)
        setShowList(false)
    }

    const places = []
    for (let place of placesList) {
        places.push(
            <li key={place.place_id}
                onClick={() => { handleListItemClick([place.lat, place.lon], place.boundingbox) }}
                className="is-placesList_item"
            >
                {place.display_name}
            </li>)
    }

    return (
        <div className="is-searchBarContainer">
            <div className="is-searchBar">
                {loader && <span className="is-loaderDots"></span>}
                <span onClick={e => {setPlacesList(''); setUserInput('')}} className="is-clearSearch">x</span>
                <input
                    type="text"
                    className="is-searchBar_input"
                    onChange={e => setUserInput(e.currentTarget.value)}
                    onKeyDown={e => hendleFind(e.keyCode)}
                    onFocus={e => setShowList(true)}
                    value={userInput}
                ></input>
                <div
                    onClick={e => hendleFind(13)}
                    className="is-searchBar_iconContainer">
                    <img src={icon} className="is-searchBar_icon" alt="Wyszukaj" />
                </div>
            </div>
            {showList && !!places.length && <ul className="is-placesList">{places}</ul>}
        </div>
    )
}

export default Search
