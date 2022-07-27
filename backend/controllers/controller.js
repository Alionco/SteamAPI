const request = require('request');
const fetch = require('node-fetch');

const APIkey = process.env.KEY;

const controller = {

    getUserInfo(req, res) {

        // exemplo de requisicao: http://localhost:3000/api/steam/getinfo/76561198048937111

        const userID = req.params.id;

        const url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + APIkey + "&steamids=" + userID + "&format=json";

        request.get(url, (err, steamRes, steamBody) => {
            res.status(200).send(steamBody);
        });
        
    },

    async getUserGames(req, res) {

        // exemplo de requisicao: http://localhost:3000/api/steam/getgames/76561198048937111

        const userID = req.params.id;

        const url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIkey + "&steamid=" + userID + "&format=json" + "&include_appinfo=true";

/*         request.get(url, (err, steamRes, steamBody) => {
            res.status(200).send(steamBody);
        }); */

        var fetchRaw = await fetch(url);
        var fetchJSON = await fetchRaw.json();
        var gamesList = fetchJSON.response.games;
        let gamesListNames = [];

        gamesList.forEach((current) => {
            gamesListNames.push(current.name + " " + "(" + current.playtime_forever + " min)");
        })

        gamesListNames.sort();

        res.status(200).send(gamesListNames);

    },

    async getMostPlayedGame(req, res) {

        // OBS: aqui estou usando fetch ao invés de request porque preciso de async/await

        // exemplo de requisicao: http://localhost:3000/api/steam/getmostplayed/76561198048937111

        const userID = req.params.id;

        const url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIkey + "&steamid=" + userID + "&format=json" + "&include_appinfo=true";

        var fetchRaw = await fetch(url);
        var fetchJSON = await fetchRaw.json();

        var mostPlayed = fetchJSON.response.games.sort((a,b) => {
            return b.playtime_forever - a.playtime_forever;
        });
        console.log(mostPlayed);

        res.status(200).send(mostPlayed[0]);

    },

}

module.exports = controller;