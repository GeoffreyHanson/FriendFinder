

var friends = require('../data/friends.js');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
        // Logic for comparing friends
        var match = {
            name: '',
            photo: '',
            friendDifference: 1000
        };

        var user = req.body;

        var uName = user.name;
        var uPhoto = user.photo;
        var uScores = user.scores;

        var totDifference = 0;
        
        for (i = 0; i < friends.length; i++) {
            console.log(friends[i].name);

            totDifference = 0;

            for (var j = 0; j < friends[i].scores[j]; j++) {
                
                totDifference += Math.abs(parseInt(uScores[j]) - parseInt(friends[i].scores[j]));

                if (totDifference <= match.friendDifference) {

                    match.name = friends[i].name;
                    match.photo = friends[i].photo;
                    match.friendDifference = totDifference;
                }
            }
        }

        friends.push(user);

        res.json(match);
    });
};