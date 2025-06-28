const { StatusCodes } =  require('http-status-codes');

const { Booking } = require('../models');
const CrudRespository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }
}

module.exports = BookingRepository;