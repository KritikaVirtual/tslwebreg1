import { createSelector } from "reselect";

const memberListReducer = (state) =>{
   return state.memberList;
}

export const  memberListData=createSelector(
    [memberListReducer],
    (memberListResult)=>{
        return memberListResult;
    }
)

export const memberListSelector=createSelector(
    [memberListData],
    (memberList)=>{
         return memberList 
        }
)