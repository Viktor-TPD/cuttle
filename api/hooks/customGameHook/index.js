const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const GameStatus = require('../../../utils/GameStatus');

module.exports = function gameHook() {
  //////////////
  // Game API //
  //////////////
  return {
    createGame: function (gameName, isRanked = false, status = GameStatus.CREATED, timerSettings = {}) {
      return new Promise(function (resolve, reject) {
        const {
          enabled: timerEnabled = false,
          type: timerType = 'turn',
          duration: timerDuration = 90,
        } = timerSettings;

        Game.create({
          name: gameName,
          isRanked: isRanked === true,
          status,
          timerEnabled,
          timerType,
          timerDuration,
        })
          .fetch()
          .then((game) => {
            return resolve(game);
          })
          .catch((err) => {
            let res;
            if (err) {
              res = err;
            } else {
              res = { message: `Unknown error creating game ${gameName}` };
            }
            return reject(res);
          });
      });
    },
    findGame: function (id) {
      return new Promise(function (resolve, reject) {
        Game.findOne(id)
          .populate('players', { sort: 'pNum' })
          .populate('deck')
          .populate('topCard')
          .populate('secondCard')
          .exec(function (error, game) {
            if (error || !game) {
              let res;
              if (error) {
                res = error;
              } else {
                res = { message: 'home.snackbar.cantFindGame' };
              }
              return reject(res);
            }
            resolve(game);
          });
      });
    },
  };
};
