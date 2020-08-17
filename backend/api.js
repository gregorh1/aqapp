const express = require('express')
const app = express()
let port = process.env.PORT || 3002;
const axios = require('axios')
const credentials = require('./credentials') // not committed file
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

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

const correctionSchema = new mongoose.Schema({
    text: String,
    file: String,
})
const Correction = mongoose.model('Correction', correctionSchema);

const apis = {
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

const updateSensors = () => {
    useAxios(apis.airly)
        .then(extResponse => {
            const sensors = extResponse.data.map((item) => {
                const content = `${!item.address.displayAddress1 ? '' : (item.address.displayAddress1 + ', ')}${item.address.displayAddress2 || ''}`
                return {
                    key: item.id,
                    position: [
                        item.location.latitude,
                        item.location.longitude
                    ],
                    content,
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
}

app.get('/update-sensors', (req, res) => {
    updateSensors()
    res.send('sensors updating - manually update')
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

app.post('/revelations', (req, res) => {
    console.log('revelations req', req.body);
    const entry = new Correction(req.body);
    entry.save();
})

setInterval(() => {
    updateSensors();
    console.log('sensors updateing from setInterval');
}, 1000 * 60 * 60 * 6); // 6h interval

app.listen(port)

console.log(`serwer is listening on port: ${port}`)
