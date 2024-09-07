import Api from "../services/api";
import userEndpoints from "../services/endpoints/userendpoints";

export const addquiz = async(data)=>{
    try {
        const response = await Api.post(userEndpoints.addquiz,data)
    } catch (error) {
        console.log(error)
    }
}

export const allQuizzes = async()=>{
    try {
        const response = await Api.get(userEndpoints.allQuizzes)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getQuiz = async (quizId) => {
    try {
        console.log(quizId, 'dd');
        const response = await Api.get(`${userEndpoints.getQuiz}/${quizId}`)
        return response;
    } catch (error) {
        console.log(error);
    }
}