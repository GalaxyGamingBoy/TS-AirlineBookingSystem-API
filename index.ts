import settings from "./src/settings.json";
import booking from "./src/data/booking.json";
import BookingModule from "./src/BookingModule";

const express = require("express");
const webApp = express();
const bookingModule: BookingModule = new BookingModule();

webApp.get("/", (req, res) => {
    res.status(418).end("I am a teapot!");
})

webApp.get("/getBookings", (req, res) => {
    res.status(200).end(JSON.stringify(booking));
})

webApp.post("/addBooking", (req, res) => {
    const name: string = req.query.name;
    const seat: string = req.query.seat;
    const plan: string = req.query.plan;

    if ( bookingModule.seatOccupied(seat) ){
        res.status(503).end("Seat occupied");
    } else {
        bookingModule.addBooking(name, parseInt(seat, 10), plan);
        res.status(201).end("Booking Created")
    }
    

})

webApp.post("/changeName", (req, res) => {
    const selectedSeat = req.query.selectedSeat;
    const newName = req.query.newName;

    if( bookingModule.seatOccupied(selectedSeat) ){
        bookingModule.changeName(selectedSeat, newName);
        res.status(200).end("Changed Name");
    } else {
        res.status(404).end(`404 - Booking with Seat: ${selectedSeat}, not found.`);
    }
})

webApp.post("/changeSeat", (req, res) => {
    const selectedSeat = req.query.selectedSeat;
    const newSeat = req.query.newSeat;

    if ( bookingModule.seatOccupied(selectedSeat) ){
        bookingModule.changeSeat(selectedSeat, newSeat);
        res.status(200).end("Changed Seat");
    } else {
        res.status(404).end(`404 - Booking with Seat: ${selectedSeat}, not found.`);
    }
})

webApp.post("/changePlan", (req, res) => {
    const selectedSeat = req.query.selectedSeat;
    const newPlan = req.query.newPlan;

    if ( bookingModule.seatOccupied(selectedSeat) ){
        bookingModule.changePlan(selectedSeat, newPlan);
        res.status(200).end("Changed Plan");
    } else {
        res.status(404).end(`404 - Booking with Seat: ${selectedSeat}, not found.`);
    }
})

webApp.delete("/deleteBooking", (req, res) => {
    const removeSeat = req.query.removeSeat;
    bookingModule.deleteBooking(removeSeat);
    res.status(200).end(`Deleted Seat: ${removeSeat}`)
})

webApp.listen(settings["server"]["port"], () => {
    console.log(`API on Port: ${settings["server"]["port"]}`);
})