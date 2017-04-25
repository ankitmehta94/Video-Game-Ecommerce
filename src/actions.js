/**
 * Created by ankit on 4/18/17.
 */
export  const GENRES_RECEIVED = 'GENRES_RECEIVED';
export  const GAMES_RECEIVED = 'GAMES_RECEIVED';
export  const GAME_DETAIL_RECEIVED = 'GAME_DETAIL_RECEIVED';
export  const GAME_DETAIL_ADDED_TO_CART = 'GAME_DETAIL_ADDED_TO_CART';
const header = {'X-Mashape-Key': 'PZzFnwlUa7mshIR29b7zMporUI45p16v4AejsnayIdsA9wY2nj','Accept': 'application/json'}

export function fetchGenres() {
    return dispatch => {
      return fetch('https://igdbcom-internet-game-database-v1.p.mashape.com/genres/?fields=*&limit=40',{headers: {'X-Mashape-Key': 'PZzFnwlUa7mshIR29b7zMporUI45p16v4AejsnayIdsA9wY2nj','Accept': 'application/json'}})
            .then(res => res.json()).then(data =>dispatch(genresReceived(data)))
    }
}
export function fetchPopularGames() {
    return dispatch => {
       return fetch('https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,cover,aggregated_rating&order=popularity:desc',{headers: {'X-Mashape-Key': 'PZzFnwlUa7mshIR29b7zMporUI45p16v4AejsnayIdsA9wY2nj','Accept': 'application/json'}})
            .then(res => res.json()).then(data =>dispatch(popularGamesReceived(data)))
    }
}
export function addGameToCart(game){
    console.log('+1');
    return {
        type:GAME_DETAIL_ADDED_TO_CART,
        game
    }
}
export function getGamesOfGenre(games) {
   let gameId = games.slice(0,30).join(',');
   console.log(gameId);
    return dispatch => {
        fetch('https://igdbcom-internet-game-database-v1.p.mashape.com/games/'+gameId+'?fields=name,cover,aggregated_rating&order=popularity:desc',{headers: {'X-Mashape-Key': 'PZzFnwlUa7mshIR29b7zMporUI45p16v4AejsnayIdsA9wY2nj','Accept': 'application/json'}})
            .then(res => res.json()).then(data =>dispatch(popularGamesReceived(data)))
    }
}
export function fetchGameInformation(gameId) {
    return dispatch => {
        fetch('https://igdbcom-internet-game-database-v1.p.mashape.com/games/'+gameId+'?fields=*',{headers: {'X-Mashape-Key': 'PZzFnwlUa7mshIR29b7zMporUI45p16v4AejsnayIdsA9wY2nj','Accept': 'application/json'}})
            .then(res => res.json()).then(data =>dispatch(detailsOfGameReceived(data[0])))
    }
}
function detailsOfGameReceived(game) {
    return {
        type:GAME_DETAIL_RECEIVED,
        game
    }
}
function genresReceived(genres) {
   // console.log(genres);
return {
    type:GENRES_RECEIVED,
    genres
}
}
function popularGamesReceived(games) {
    console.log(games);
    return {
        type: GAMES_RECEIVED,
        games
    }
}
    //fetchGenres();