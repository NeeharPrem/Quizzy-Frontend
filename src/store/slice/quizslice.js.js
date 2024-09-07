import { createSlice } from "@reduxjs/toolkit";
import store from "../store";

const initialState= {
    name:'',
    currentQuiz:[],
    result:null,
    oldResults:[]
};

const quizSlice= createSlice({
    name:'quiz',
    initialState,
    reducers:{
        setName: (state,action)=>{
            state.name= action.payload
        },
        setAnswers: (state, action) => {
            state.currentQuiz.push(action.payload);
        },
        storeResult:(state,action)=>{
            state.result= action.payload
        },
        setoldResults:(state,action)=>{
            state.oldResults= action.payload
        },
        resetData:(state)=>{
            state.currentQuiz=[],
            state.result= null
        }
    }
})
export const {setAnswers,setName,setoldResults,resetData,storeResult}=quizSlice.actions;

export default quizSlice.reducer;