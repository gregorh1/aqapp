const express = require('express')
const app = express()
const port = 3002
const axios = require('axios')
const credentials = require('./credentials')

const MongoClient = require('mongodb').MongoClient;
const uri = credentials.mongoUri;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("airquality").collection("points");
  collection.find().toArray((err, resoult) => {
      console.log(resoult)
  })
  // perform actions on the collection object
  client.close();
});


const apis = {
    openaq: {
        url: 'https://api.openaq.org/v1/locations',
        headers: null,
        params: {
            country: 'PL',
            // city: 'sosnowiec'
        }
    },
    airly: {
        url: 'https://airapi.airly.eu/v2/installations/nearest',
        headers: {
            Accept: 'application/json',
            apikey: credentials.airlyApikey
        },
        params: {
            lat: '50.062006',
            lng: '19.940984',
            maxDistanceKM: '-1',
            maxResults: '100'
        }
    }
}

const useAxios = (api) => {
    return axios.get(api.url, {
        headers: api.headers,
        params: api.params
    })
}

app.get('/airly', (req, res) => {
    useAxios(apis.airly)
        .then(extResponse => {
            const items = extResponse.data.map((item) => {
                return {
                    key: item.id,
                    position: [
                        item.location.latitude,
                        item.location.longitude
                    ],
                    content: item.address.displayAddress1 + ', ' + item.address.displayAddress2
                }
            })
            res.send(items)
        })
})

app.get('/openaq', (req, res) => {
    useAxios(apis.openaq)
        .then(extResponse => {
            const items = extResponse.data.results.map((item) => {
                return {
                    key: item.id,
                    position: [
                        item.coordinates.latitude,
                        item.coordinates.longitude
                    ],
                    content: item.location
                }
            })
            res.send(items)
        })
})

app.listen(port)

console.log(`serwer is listening on port: ${port}`)
