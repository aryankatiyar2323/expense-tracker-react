import api from "./api.js";

const register = async (name, email, password) => {
    try {
        const response = await api.post("/auth/register", {
            name,
            email,
            password,
        });

        return response.data;

    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", response.data.token);
        
        return response.data;
    }
    catch(error){
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem("token");
}

export { register, login, logout };