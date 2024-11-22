import axios from 'axios';

const instance = axios.create({
    baseURL: "https://bajaj-finser-task.onrender.com/bfhl",
});

export default instance;