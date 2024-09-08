import { createSlice } from "@reduxjs/toolkit";

const storedAdmininfo = localStorage.getItem("adminLoggedin");
const parsedAdmininfo = storedAdmininfo ? JSON.parse(storedAdmininfo) : null;

const initialState = {
    name: '',
    currentQuiz: [],
    result: null,
    oldResults: [],
    timeTaken: 0,
    adminLoggedin: parsedAdmininfo ?? null,
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
        },
        adminLogin: (state, action) => {
            state.adminLoggedin = action.payload;
            localStorage.setItem("adminLoggedin", JSON.stringify(action.payload));
        },
        adminLogout: (state) => {
            state.adminLoggedin = false;
            localStorage.removeItem("adminLoggedin");
        },
    }
});

export const { setAnswer, setName, setOldResults, resetData, storeResult, setTimeTaken, adminLogin, adminLogout } = quizSlice.actions;

export default quizSlice.reducer;