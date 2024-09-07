import { configureStore } from "@reduxjs/toolkit";
import quizReducer from './slice/quizslice.js';

const store = configureStore({
    reducer: {
        quiz: quizReducer,
    },
    devTools: true,
});

export default store;