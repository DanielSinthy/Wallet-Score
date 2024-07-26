

const axios = require('axios');

async function calculateScore(address) {

    let stakeAddress = null;
    try {
        const response = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/addresses/' + address, {headers: {project_id: "mainnetOWJvpavAGJRhQbSNYHA29SEV5OdPUXqp"}});
        stakeAddress = response.data.stake_address;
    } catch (e) {
        console.log(e);
    }

    if (!stakeAddress) {
        return {"status": "error", "message": "No stake address!"}
    }

    try {
        const response = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/accounts/' + stakeAddress, {headers: {project_id: "mainnetOWJvpavAGJRhQbSNYHA29SEV5OdPUXqp"}});
        return response.data;
    } catch (e) {
        console.log(e);
        
    }
    
}


module.exports = {
    calculateScore
};
