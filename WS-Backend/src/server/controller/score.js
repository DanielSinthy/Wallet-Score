const timestamp = require('unix-timestamp');
const axios = require('axios');

const projectId = "mainnetOWJvpavAGJRhQbSNYHA29SEV5OdPUXqp";
const currentEpoch = 499;

/**
 * Main controller for route score
 */
async function calculateScore(address) {

    let delegationAgeEpoch = null;
    let balance = null;
    let stakeAddress = null;
    let poolId = null;
    let poolName = "";
    let policyCount = null;

    stakeAddress = await fetchStakeAddress(address);

    if (!stakeAddress) {
        return {status: {success: false, message: "No stake address!"}}
    }

    [delegationAgeEpoch, balance, poolId] = await fetchData(stakeAddress);

    if (poolId) {
        poolName = await fetchPoolName(poolId);
    }

    policyCount = await fetchPoliceCount(stakeAddress);

    let transactionCount = 0;
    let ageObj = {}
    if (bigAccounts[address]) {
        transactionCount = bigAccounts[address].transactionCount;
        ageObj = bigAccounts[address].ageObj;
    } else {
        [transactionCount, ageObj] = await fetchTransactions(stakeAddress);
    }

    let output = {
        status: {success: true, message: ""},
        delegationAge: 0,
        walletAge: ageObj['daysTotal'],
        walletAgeString: ageObj['string'],
        transactionCount: 500,
        balance: 55555,
        balanceAda: 5,
        policyCount: 0,
        stakepool: "",
        index: {
            walletAgeIndex: 0,
            totalTxIndex: 0,
            balanceIndex: 0,
            policyCountIndex: 0,
            stakeDateIndex: 0,
            reportedIndex: 0,
            openWalletScore: 0
        }
    };

    // set values to final object
    if (delegationAgeEpoch) {
        output.delegationAge = (currentEpoch - delegationAgeEpoch) * 5;
    }
    if (balance) {
        output.balance = parseInt(balance);
        output.balanceAda = parseInt(balance) / 1000000;
    }
    if (poolName) {
        output.stakepool = poolName;
    }
    if (policyCount) {
        output.policyCount = policyCount;
    }
    if (transactionCount) {
        output.transactionCount = transactionCount;
    }
    if (transactionCount) {
        output.transactionCount = transactionCount;
    }

    output = calculateIndexValues(output, address);

    return output;
}

/**
 * Fetch the stake address by an adress from blockfrost api
 */
async function fetchStakeAddress(address) {
    try {
        const response = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/addresses/' + address, {headers: {project_id: projectId}});
        return response.data.stake_address;
    } catch (e) {
        console.log(e);
    }
}

/**
 * Fetch the pool name by the poolid from blockfrost api
 */
async function fetchPoolName(poolId) {
    try {
        const response = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/pools/' + poolId + '/metadata', {headers: {project_id: projectId}});
        return response.data.name;
    } catch (e) {
        console.log(e);
    }
}

/**
 * Fetch transaction list from koios
 */
async function fetchTransactions(stakeAddress) {
    try {
        const response = await axios.get('https://api.koios.rest/api/v1/account_txs?_stake_address=' + stakeAddress);
        transactionCount = response.data.length;

        var firstBlockTime = null;
        response.data.forEach(function (elem) {
            if ((firstBlockTime === null) || (elem.block_time < firstBlockTime)) {
                firstBlockTime = elem.block_time;
            }
        });

        ageObj = calculateAge(firstBlockTime);
        return [transactionCount, ageObj];
    } catch (e) {
        console.log(e);
    }
}

/**
 * Fetch the policyIds ba stakeID from blockfrost api
 */
async function fetchPoliceCount(stakeAddress) {
    try {
        const response = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/accounts/' + stakeAddress + '/addresses/assets', {headers: {project_id: projectId}});
        return response.data.length;
    } catch (e) {
        console.log(e);
    }
}

/**
 * Fetch basic data like age, poolId and balance from blockfrost
 */
async function fetchData(stakeAddress) {
    try {
        const response = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/accounts/' + stakeAddress, {headers: {project_id: projectId}});
        delegationAgeEpoch = response.data.active_epoch;
        balance = response.data.controlled_amount;
        poolId = response.data.pool_id;
        return [delegationAgeEpoch, balance, poolId];
    } catch (e) {
        console.log(e);
    }
}

/**
 * Calculate the index values
 */
function calculateIndexValues(output, address) {

    // walletIndex
    if (output.walletAge < 30) {
        output.index.walletAgeIndex = 0;
    } else if (output.walletAge > 90) {
        output.index.walletAgeIndex = 15;
    } else {
        output.index.walletAgeIndex = 5;
    }
    output.index.openWalletScore += output.index.walletAgeIndex;

    // totalTxIndex
    if (output.transactionCount < 10) {
        output.index.totalTxIndex = 0;
    } else if (output.transactionCount > 30) {
        output.index.totalTxIndex = 20;
    } else {
        output.index.totalTxIndex = 10;
    }
    output.index.openWalletScore += output.index.totalTxIndex;

    // balanceIdex
    if (output.balanceAda < 30) {
        output.index.balanceIndex = 0;
    } else {
        output.index.balanceIndex = 5;
    }
    output.index.openWalletScore += output.index.balanceIndex;

    // policyCountIndex
    if (output.policyCount < 3) {
        output.index.policyCountIndex = 0;
    } else if (output.policyCount > 8) {
        output.index.policyCountIndex = 20;
    } else {
        output.index.policyCountIndex = 10;
    }
    output.index.openWalletScore += output.index.policyCountIndex;

    // stakeDateIndex
    if (output.delegationAge < 10) {
        output.index.stakeDateIndex = 0;
    } else if (output.delegationAge > 30) {
        output.index.stakeDateIndex = 20;
    } else {
        output.index.stakeDateIndex = 5;
    }
    output.index.openWalletScore += output.index.stakeDateIndex;

    const scamList = [
        "addr1q965hhtm37m0836c4va2wpaysal370v37lthxt9ylsm4ndx4p8zlw304qch8g95kdrtyfqeachje7rcxt4zsd3g8hless3jl40",
        "addr1qyu6rh63z3akmengnfrj0prfvtak2sxr50rctxs60xu5yr6krpuk5k3ggkk2s5m93gd6lu3up9r2af8uwz4sx9gah20qqwah5a"
    ];

    if (!scamList.includes(address)) {
        output.index.reportedIndex = 20;
    }
    output.index.openWalletScore += output.index.reportedIndex;

    return output;
}


function calculateAge(firstBlockTime) {
    const ageInSeconds = timestamp.now() - firstBlockTime;

    const age = [];
    // for this POC I don't care about leap years
    age['secondsTotal'] = parseInt(ageInSeconds);
    age['daysTotal'] = parseInt(ageInSeconds / 86400);
    age['hoursTotal'] = parseInt(ageInSeconds / 3600);
    age['epochs'] = parseInt(age['daysTotal'] / 5);
    age["year"] = parseInt(age['secondsTotal'] / (365 * 86400));
    age["day"] = parseInt(age['daysTotal'] - (365 * age['year']));
    age["hour"] = parseInt(age['hoursTotal'] - (age['year'] * 365 * 24) - (age['day'] * 24));
    age["string"] = age["year"] + "y " + age["day"] + "d " + age["hour"] + "h";

    return (age);
}

const bigAccounts = {
    "addr1qxdfqunt6cjd03485aqpma6e065kvf2vuxznfu6ex0kjnclrzr27g03klu862usxqsru794d03gzkk8n86ta34n85z0s704vzm":
        {transactionCount: 5546, ageObj: {'daysTotal': 780, 'string': "2y 50d 2h"}},
    "addr1qyu6rh63z3akmengnfrj0prfvtak2sxr50rctxs60xu5yr6krpuk5k3ggkk2s5m93gd6lu3up9r2af8uwz4sx9gah20qqwah5a":
        {transactionCount: 22017, ageObj: {'daysTotal': 1184, 'string': "3y 89d 2h"}}
};

module.exports = {
    calculateScore
};
