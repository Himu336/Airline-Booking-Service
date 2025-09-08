const express = require('express');
const { ServerConfig, Queue } = require('./config');
const apiRoutes = require('./routes');
const scheduleCrons = require('./utils/common/cron-jobs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`)
    scheduleCrons();
    await Queue.connectQueue();
    console.log('Queue connected');
});