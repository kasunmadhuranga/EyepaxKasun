import axios from "axios";

const apiClient = axios.create({
    baseURL: `http://localhost:3000/api`,
    headers: {
        "Content-Type": "application/json",
    },
});


const userService = {
    getAll: async () => {
        try {
            const response = await apiClient.get(`/user`);
            return response;
        } catch (error) {
            console.error("Error verifying user:", error);
            throw error;
        }
    },
    
};

export default userService;