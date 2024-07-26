

const axios = require('axios');

async function calculateScore(address) {

    let age = null;
    let balance = null;
    let stakeAddress = null;
    let poolId = null;
    let poolName = null;
    let policyCount = null;
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
        age = response.data.active_epoch;
        balance = response.data.controlled_amount;
        poolId = response.data.pool_id;
        //return response.data;
    } catch (e) {
        console.log(e);
    }

    try {
        const response = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/pools/' + poolId + '/metadata', {headers: {project_id: "mainnetOWJvpavAGJRhQbSNYHA29SEV5OdPUXqp"}});
        poolName = response.data.name;
        //return response.data;
    } catch (e) {
        console.log(e);
    }

    try {
        const response = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/accounts/' + stakeAddress + '/addresses/assets', {headers: {project_id: "mainnetOWJvpavAGJRhQbSNYHA29SEV5OdPUXqp"}});
        policyCount = response.data.length;
    } catch (e) {
        console.log(e);
    }


    let output = {
        age: 100,
        transactions: 500,
        balance: 55555,
        policyCount: 0,
        stakepool: "Test"
    };

    if (age) {
        output.age = age;
    }
    if (balance) {
        output.balance = balance;
    }
    if (poolName) {
        output.stakepool = poolName;
    }
    if (policyCount) {
        output.policyCount = policyCount;
    }

    return output;
}


module.exports = {
    calculateScore
};
