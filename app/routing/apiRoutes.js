var friendsData = require('../data/friends');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friendsData);
    });

    app.post('/api/friends', function(req, res) {
        // Logic for comparing friends
        var match = {
            name: '',
            photo: '',
            friendDifference: 1000
        };

        var data = req.body;

        var name = data.name;
        var photo = data.photo;
        var scores = data.scores;

        var difference = 0;
        
        for (i = 0; i < friendsData.length; i++) {
            console.log(friendsData[i].name);
            difference = 0;

            for (var j = 0; j < friendsData[i].scores[j]; j++) {
                
                difference += Math.abs(parseInt(scores[j]) - parseInt(friendsData[i].scores[j]));

                if (difference <= match.friendDifference) {
                    match.name = friendsData[i].name;
                    match.photo = friendsData[i].photo;
                    match.friendDifference = difference;
                }
            }
        }
        friendsData.push(data);
        res.json(match);
    });
};