const { BookingService } = require('../services');
const { StatusCodes }= require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const inMemDb = {};

async function createBooking(req, res){
    try{
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats,
            recepientEmail: req.body.recepientEmail
        });
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch(error){
        ErrorResponse.error = error;
        return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json(ErrorResponse);
    }
};

async function makePayment(req, res){
    try{
        const idempotencyKey = req.headers['x-idempotency-key'];
        if(!idempotencyKey){
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message:'idmpotency key missiong'});
        }

        if(inMemDb[idempotencyKey]){
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message:' Cannot retry on a successful payment'});
        }
        const response = await BookingService.makePayment({
            userId: req.body.userId,
            totalCost: req.body.totalCost,
            bookingId: req.body.bookingId
        });

        inMemDb[idempotencyKey] = idempotencyKey;

        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch(error){
        ErrorResponse.error = error;
        return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json(ErrorResponse);
    }
};

module.exports = {
    createBooking,
    makePayment
}