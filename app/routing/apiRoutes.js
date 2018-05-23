var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    friends.push(req.body);

    var newUser = friends.slice(-1)[0];
    var matchingFriend = {};
    var newUserScore = 0;

    for (var i = 0; i < newUser.scores.length; i++) {
      newUserScore += parseInt(newUser.scores[i]);
    }

    var matchingDiff = 99999999;
    var diff = 0;
    var score = 0;

    for (var i = 0; i < friends.length - 1; i++) {
      for (var j = 0; j < friends[i].scores.length; j++) {
        score += parseInt(friends[i].scores[j]);
      }
      diff = Math.abs(score - newUserScore);
      if (diff < matchingDiff) {
        matchingDiff = diff;
        matchingFriend = friends[i];
        score = 0;
      } else {
        score = 0;
      }
    }
    res.json(matchingFriend);
  });
};
