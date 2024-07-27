const timestamp = require('unix-timestamp');
const axios = require('axios');

async function calculateScore(address) {

    let age = null;
    let balance = null;
    let stakeAddress = null;
    let poolId = null;
    let poolName = null;
    let policyCount = null;
    let ageObj = null;
    
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

    try {
        const response = await axios.get('https://api.koios.rest/api/v1/account_txs?_stake_address=' + stakeAddress);
        transactionCount = response.data.length;
        
        var firstBlockTime = null;
        response.data.forEach(function(elem) {
            if((firstBlockTime === null) || (elem.block_time < firstBlockTime)) {
                firstBlockTime = elem.block_time;
            }
        });
        
        ageObj = calculateAge(firstBlockTime); 
        //return response.data
    } catch (e) {
        console.log(e);
    }
    

    let output = {
        age: 100,
        ageString: ageObj['string'],
        transactionCount: 500,
        balance: 55555,
        balanceAda: 5,
        policyCount: 0,
        stakepool: "Test",

    };

    if (age) {
        output.age = age;
    }
    if (balance) {
        output.balance = parseInt(balance);
        output.balanceAda = parseInt(balance)/1000000;
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


    return output;
}

function calculateAge(firstBlockTime) { 
   const ageInSeconds = timestamp.now()-firstBlockTime;

   const age = [];
   // for this POC I don't care about leap years
   age['secondsTotal'] = parseInt(ageInSeconds);
   age['daysTotal'] = parseInt(ageInSeconds/86400);
   age['hoursTotal'] = parseInt(ageInSeconds/3600);
   age['epochs'] = parseInt(age['daysTotal']/5);
   age["year"] = parseInt(age['secondsTotal']/(365*86400));
   age["day"] = parseInt(age['daysTotal']-(365*age['year']));
   age["hour"] = parseInt(age['hoursTotal']-(age['year']*365*24)-(age['day']*24));
   age["string"] = age["year"] + "y " + age["day"] + "d " + age["hour"] + "h"; 
 
   console.log(age);

   return(age);
 }


module.exports = {
    calculateScore
};

