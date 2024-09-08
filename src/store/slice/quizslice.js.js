import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    currentQuiz: [],
    result: null,
    oldResults: [],
    timeTaken: 0
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAnswer: (state, action) => {
            const { questionId, answer } = action.payload;
            const existingIndex = state.currentQuiz.findIndex(item => item.questionId === questionId);

            if (existingIndex !== -1) {
                state.currentQuiz[existingIndex] = { questionId, answer };
            } else {
                state.currentQuiz.push({ questionId, answer });
            }
        },
        storeResult: (state, action) => {
            state.result = action.payload;
        },
        setOldResults: (state, action) => {
            state.oldResults = action.payload;
        },
        resetData: (state) => {
            state.currentQuiz = [];
            state.result = null;
            state.timeTaken = 0;
        },
        setTimeTaken: (state, action) => { 
            state.timeTaken = action.payload;
        }
    }
});

export const { setAnswer, setName, setOldResults, resetData, storeResult, setTimeTaken } = quizSlice.actions;

export default quizSlice.reducer;