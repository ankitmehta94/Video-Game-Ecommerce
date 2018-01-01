/**
 * Created by ankit on 4/24/17.
 */
import {GAME_DETAIL_ADDED_TO_CART} from './actions'
import {GAME_DETAIL_REMOVED_FROM_CART} from './actions'
export default function cartGames(state= [], action = {}) {

    switch (action.type){
        case GAME_DETAIL_ADDED_TO_CART:
            return selectedGames(state, action.game);
        case GAME_DETAIL_REMOVED_FROM_CART:
        	removeById(state, action.game);
            return state;
        default:return state;
    }
}

function findById (array,key, id){
	let flag = false;
	let l = array.length;
	for(let i = 0; i< l; i++){
		if(array[i][key]===id){
			flag = array[i];
			break;
		}
	}
	return flag;
}
function removeById (array,key, id){
	console.log(array);
	let l = array.length;
	for(let i = 0; i< l; i++){
		if(array[i][key]===id){
			array.splice(i, 1);
			break;
		}
	}
	console.log(array);
}
function selectedGames(state, game){
	if(findById(state, 'id', game.id)){
		console.log('asss1')
		return state;
	}else{console.log('asss2')
		return [...state,game];
	}
}