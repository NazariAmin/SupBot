var FacebookDataModels = require('./facebook-channeldata');
module.exports = function (session) {
    //session.error('Flights Dialog is not implemented and is instead being used to show Bot error handling');
    
    session.send('Looking into your upcoming flights to see if you can check-in on any of those...');

    var now = new Date();

    // Airline Checkin
    var checkin = new FacebookDataModels.AirlineCheckin(
        'Check-in is available now',
        'en_US',
        'ABCDED',
        'http://www.airline.com/check_in',
        [
            new FacebookDataModels.FlightInfo(
                'F001',
                new FacebookDataModels.Airport(
                    'SFO',
                    'San Francisco',
                    'T4',
                    'G8'
                ),
                new FacebookDataModels.Airport(
                    'EZE',
                    'Buenos Aires',
                    'C',
                    'A2'
                ),
                new FacebookDataModels.FlightSchedule(
                    now.addDays(1),
                    now.addDays(1).addHours(1.5),
                    now.addDays(2)
                ))
        ]);
    
    var reply = new builder.Message(session);
    if (session.message.address.channelId === 'facebook') {
        reply.sourceEvent({
            facebook: {
                attachment: checkin
            }
        });
    } else {
        reply.text(checkin.toString());
    }

    session.send(reply);
};
// Helpers
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.addHours = function (hours) {
    var date = new Date(this.valueOf());
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
};

function formatDate(date) {
    return date.toISOString().split('.')[0];
}
