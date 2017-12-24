/**
 * Created by ankit on 4/18/17.
 */
export  const GENRES_RECEIVED = 'GENRES_RECEIVED';
export  const GAMES_RECEIVED = 'GAMES_RECEIVED';
export  const GAME_DETAIL_RECEIVED = 'GAME_DETAIL_RECEIVED';
export  const GAME_DETAIL_ADDED_TO_CART = 'GAME_DETAIL_ADDED_TO_CART';
export  const GAME_DETAIL_REMOVED_FROM_CART = 'GAME_DETAIL_REMOVED_FROM_CART';
//const headers = {'user-key': '4610373d01125542a9c7c3618762c6c2','Accept': 'application/json'}
const headers = {}
//const baseUrl = 'http://localhost:6500/';
const baseUrl = window.__env1.apiUrl;
//const authString = '&user_key=4610373d01125542a9c7c3618762c6c2';
const authString = '';
console.log(headers);
// export function fetchGenres() {
//     return dispatch => {
//       return fetch('http://localhost:6500/genres' + authString,{headers: headers})
//             .then(res => res.json()).then(data =>dispatch(genresReceived(data)))
//     }
// }
export function fetchGenres() {
    return dispatch => {
       return fetch(baseUrl+'genres')
	       .then(res => res.json()).then(data =>dispatch(genresReceived(data)))
    }
}
export function fetchPopularGames() {
    return dispatch => {
       return fetch(baseUrl+'games')
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
export function removeGameFromCart(list,game){
    list.forEach(function (datum, index) {
        if(datum.id === game.id){
            console.log(datum, index);
        }
        
    });
    console.log('-1');
    return {
        type:GAME_DETAIL_REMOVED_FROM_CART,
        game
    }
}
export function getGamesOfGenre(games) {
   let gameId = games.slice(0,30).join('&game_id=');
   console.log(gameId);
    return dispatch => {
        fetch(baseUrl+'gamesList?'+gameId,{headers: headers})
            .then(res => res.json()).then(data =>dispatch(popularGamesReceived(data)))
    }
}
export function fetchGameInformation(gameId) {
    return dispatch => {
        fetch(baseUrl +'singleGame?game_id='+gameId)
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