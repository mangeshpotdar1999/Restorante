// import { LEADERS } from '../shared/leaders';
import * as ActionTypes from './ActionTypes';
export const Leaders = (state= {isLoading:true,errMess:null,leaders:[]},action)=>{
    switch(action.type){
        case ActionTypes.ADD_LEADER:
            return{...state,isLoading:false,errMess:null,leaders:action.payload};

        case ActionTypes.LEADER_LOADING:
            return{...state,isLoading:true,errMess:null,leaders:[]};
        
        case ActionTypes.LEADER_FAILED:
            return{...state,isLoading:false,errMess:action.payload};


        default:
            return state
    }
};
