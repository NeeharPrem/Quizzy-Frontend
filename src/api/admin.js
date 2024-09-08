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
        const response = await Api.post(userEndpoints.addquiz, data)
        return response
    } catch (error) {
        console.log(error)
    }
}