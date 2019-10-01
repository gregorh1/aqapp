const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')

const getData = () => {
    axios.get('https://api.openaq.org/v1/locations', {
        params: {
            country: 'PL',
            city: 'sosnowiec'
        }
    })
    .then(extResponse => {
        app.get('/', (req, res) => res.send(extResponse.data.results))
    })
}

app.listen(port, getData())