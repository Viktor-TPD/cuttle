const gameAPI = sails.hooks['customgamehook'];

module.exports = function (req, res) {
  const {
    gameName,
    isRanked = false,
    timerEnabled = false,
    timerType = 'turn',
    timerDuration = 90,
  } = req.body;
  if (req.body.gameName) {
    const timerSettings = {
      enabled: timerEnabled,
      type: timerType,
      duration: timerDuration,
    };
    gameAPI
      .createGame(gameName, isRanked, undefined, timerSettings)
      .then(function (game) {
        sails.sockets.broadcast('GameList', 'gameCreated', {
          id: game.id,
          name: game.name,
          status: game.status,
          isRanked: game.isRanked,
          players: [],
          timer: {
            enabled: game.timerEnabled,
            type: game.timerType,
            duration: game.timerDuration,
          },
        });
        return res.ok({ gameId: game.id });
      })
      .catch(function (reason) {
        res.badRequest(reason);
      });
  }
};
