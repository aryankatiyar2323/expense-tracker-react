import api from "./api.js";

const addExpense = async (expenseData) => {
    try {
        const response = await api.post("/expenses", expenseData);
        
        return response.data;
    }
    catch (error){
        throw error.response?.data || error;
    }
}

const getExpenses = async () => {
    try{
        const response = await api.get("/expenses");
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
}

const updateExpense = async (id, expenseData) => {
    try {
        const response = await api.put(`/expenses/${id}`, expenseData);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
}

const deleteExpense = async (id) => {
    try{
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
}

export {addExpense, getExpenses, updateExpense, deleteExpense};