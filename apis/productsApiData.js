import axios from 'axios';

export default axios.create({
    baseURL: "https://raw.githubusercontent.com/traa/apiplp/master/db.json"
});