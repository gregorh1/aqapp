const express = require('express')
const app = express()
const port = 3002
const axios = require('axios')
const credentials = require('./credentials') // not committed file

const mongoose = require('mongoose')
mongoose.connect(credentials.mongoUri, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('connected to db');
})

const sensorSchema = new mongoose.Schema({
    key: String,
    position: [Number, Number],
    content: String,
    sensorId: Number,
    provider: String
});
const Sensor = mongoose.model('Sensor', sensorSchema);

const timeStampSchema = new mongoose.Schema({
    timestamp: Number
});

const TimeStamp = mongoose.model('TimeStamp', timeStampSchema);

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
            maxResults: '-1'
        }
    }
}

const useAxios = (api) => {
    return axios.get(api.url, {
        headers: api.headers,
        params: api.params
    })
}

const updateSensors = (isForce = false) => {
    TimeStamp.find({ _id: '5da48fa0556b6a4e2446bc33' }, function (err, timeSt) {
        const then = timeSt[0].timestamp;
        const now = Math.floor(Date.now() / (1000 * 60))
        if (now - then > 60 || isForce) {
            // TODO in future use separate timestamps for separate providers
            TimeStamp.findOneAndUpdate({ _id: '5da48fa0556b6a4e2446bc33' }, { timestamp: Math.floor(Date.now() / (1000 * 60)) }, function (err) {
                console.log('timestamp updated');
            })
            // airly
            useAxios(apis.airly)
                .then(extResponse => {
                    const sensors = extResponse.data.map((item) => {
                        return {
                            key: item.id,
                            position: [
                                item.location.latitude,
                                item.location.longitude
                            ],
                            content: item.address.displayAddress1 + ', ' + item.address.displayAddress2,
                            sensorId: item.id,
                            provider: 'airly'
                        }
                    })
                    return sensors
                })
                .then((sensors) => {
                    // delete sensors from this provider
                    Sensor.deleteMany({ provider: 'airly' }, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            // send new sensors to db
                            sensors.forEach(sensor => {
                                const entry = new Sensor(sensor)
                                entry.save()
                            });
                            console.log('airly sensors updating');
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                })

            // openaq
            // useAxios(apis.openaq)
            //     .then(extResponse => {
            //         const sensors = extResponse.data.results.map((item) => {
            //             return {
            //                 key: item.id,
            //                 position: [
            //                     item.coordinates.latitude,
            //                     item.coordinates.longitude
            //                 ],
            //                 content: item.location
            //             }
            //         })
            //         return sensors
            //     })
            //     .then((sensors) => {
            //         // delete sensors from this provider
            //         Sensor.deleteMany({ provider: 'airly' }, function (err) {
            //             if (err) {
            //                 console.log(err);
            //             } else {
            //                 // send new sensors to db
            //                 sensors.forEach(sensor => {
            //                     const entry = new Sensor(sensor)
            //                     entry.save()
            //                 });
            //                 console.log('openaq sensors updating');
            //             }
            //         })
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
        } // if
    })
}

app.get('/db', (req, res) => {
    updateSensors(true)
    res.send('db updated')
})

app.get('/data', (req, res) => {
    Sensor.find({
        'position.0': {
            $lte: req.query.latMax,
            $gte: req.query.latMin
        },
        'position.1': {
            $lte: req.query.lngMax,
            $gte: req.query.lngMin
        }
    },
        function (err, resoult) {
            if (err) {
                console.log(err)
            } else {
                const data = resoult.map((item) => {
                    return {
                        key: item.key,
                        position: [
                            item.position[0],
                            item.position[1]
                        ],
                        content: item.content,
                        sensorId: item.sensorId
                    }
                })
                res.send(data)
            }
        })
})

app.listen(port)

console.log(`serwer is listening on port: ${port}`)
