// import { DISHES } from '../shared/dishes';
import * as ActionTypes from './ActionTypes';
export const Dishes = (state={isLoading:true,errMess:null,dishes:[]},action)=>{

    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {
                ...state,
                isLoading:false,
                errMess:null,
                dishes:action.payload
            };
        case ActionTypes.DISH_LOADING:
            return{
                ...state,
                isLoading:true,
                errMess:null,
                dishes:[]
            };
        case ActionTypes.DISH_FAILED:
            return{
                ...state,
                isLoading:false,
                errMess:action.payload
            }
        default:
            return state
    }
};