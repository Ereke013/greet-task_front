import axios from "axios";

const localhost = "8000";
const instance=axios.create({
    baseURL:`http://localhost:${localhost}`
});