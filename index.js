const promClient = require('prom-client')
const collectDefaultMetrics = promClient.collectDefaultMetrics
const Registry = promClient.Registry
const register = new Registry()
collectDefaultMetrics({ register })

const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/metrics', async (req, res) => {
    res.send(await register.metrics())
})

const counter = new promClient.Counter({
    name: 'counter',
    help: 'counter_help',
});

const gauge = new promClient.Gauge({
    name: 'gauge',
    help: 'gauge_help',
});

const histrogram = new promClient.Histogram({
    name: 'histrogram',
    help: 'histrogram_help',
});

app.get('/', (req, res) => {
    counter.inc();
    gauge.inc();
    histrogram.observe();

    res.send('Hello World!')
})
