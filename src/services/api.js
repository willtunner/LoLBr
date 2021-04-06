import axios from 'axios';


// https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/DNw8fFlXtEKW5FIpCyaaYILJCoFAHoY0hFXc5Oa3qDY?api_key=RGAPI-14ee9d9d-ff64-4d91-a053-ce94f26b99d0
const instance = axios.create({
    baseURL: 'https://br1.api.riotgames.com/lol/'
});

export default instance;