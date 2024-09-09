import Api from "../services/api";
import adminEndpoints from '../services/endpoints/adminendpoints'

export const allQuizzes = async () => {
    try {
        const response = await Api.get(adminEndpoints.allQuizzes)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteQuiz = async (id)=>{
    try {
       const response = await Api.delete(`${adminEndpoints.deleteQuiz}/${id}`)
       return response
    } catch (error) {
        console.log(error)
        res.statu(500).json({message:'Internal server error'})
    }
}

export const addquiz = async (data) => {
    try {
        console.log(data,'gjg')
        const response = await Api.post(adminEndpoints.addquiz, data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const signup =async(data)=>{
    try {
        const response = await Api.post(adminEndpoints.signup,data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const login = async (data)=>{
    try{
        const response= await Api.post(adminEndpoints.login,data)
        return response
    }catch(error){
        console.log(error)
    }
}

export const logout = async()=>{
    try {
        const response= await Api.post(adminEndpoints.logout)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getQuiz = async (quizId) => {
    try {
        const response = await Api.get(`${adminEndpoints.getQuiz}/${quizId}`)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const editQuiz = async (quizId, data) => {
    try {
        console.log(data,'dd')
        const response = await Api.patch(`${adminEndpoints.editquiz}/${quizId}`, data);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error updating quiz: ' + error.message);
    }
};