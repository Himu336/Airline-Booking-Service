const express = require('express');
const router = express.Router();

const bookingRoutes = require('./booking');

router.get('/info',(req,res) => {
    return res.json({msg: "ok"});
});

router.use('/bookings', bookingRoutes);

module.exports = router;