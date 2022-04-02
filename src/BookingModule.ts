import booking from "./data/booking.json"

var fs = require("fs")

export default class BookingModule{
    seatOccupied(seat: string){
        let result: boolean = false;
        if( parseInt(seat, 10) < 0 )
            return true;
        
            booking.forEach((user) => {
            if(user.seat == seat)
                result = true;
        })

        return result;
    }

    addBooking(name: string, seat: number, plan: string){
        let newUser = {"name": name, "seat": seat.toString(), "plan": plan};
        booking.push(newUser)
    }

    changeName(selectedSeat: string, newName: string){
        booking.forEach((value, index) => {
            if(value.seat == selectedSeat)
                booking[index].name = newName;
        })
    }

    changeSeat(selectedSeat: string, newSeat: string){
        booking.forEach((value, index) => {
            if(value.seat == selectedSeat)
                booking[index].seat = newSeat;
        })
    }

    changePlan(selectedSeat: string, newPlan: string){
        booking.forEach((value, index) => {
            if(value.seat == selectedSeat)
                booking[index].plan = newPlan;
        })
    }

    deleteBooking(seatToRemove: string){
        const numberSeat = parseInt(seatToRemove, 10);
        if (numberSeat > -1)
            booking.splice(booking.findIndex(b => b.seat === seatToRemove), 1);
    }
}