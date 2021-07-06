const promClient = require('prom-client')
const collectDefaultMetrics = promClient.collectDefaultMetrics
const registry = new promClient.Registry()

const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    collectDefaultMetrics({ register: registry })

    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/metrics', async (req, res) => {
    res.send(await registry.metrics())
})

const counter = new promClient.Counter({
    name: 'my_counter',
    help: 'my_counter_help',
});
registry.registerMetric(counter)

const gauge = new promClient.Gauge({
    name: 'my_gauge',
    help: 'my_gauge_help',
});
registry.registerMetric(gauge)

const histrogram = new promClient.Histogram({
    name: 'my_histrogram',
    help: 'my_histrogram_help',
});
registry.registerMetric(histrogram)

app.get('/', (req, res) => {
    counter.inc();
    gauge.inc();
    histrogram.observe(10);

    res.send('Hello World!')
})
