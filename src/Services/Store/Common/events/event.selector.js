import { createSelector } from "reselect";

const eventListReducer = (state) =>{
   return state.eventList;
}

export const  eventListData=createSelector(
    [eventListReducer],
    (eventListResult)=>{
        return eventListResult;
    }
)

export const eventListSelector=createSelector(
    [eventListData],
    (eventList)=>{
         return eventList 
        }
)