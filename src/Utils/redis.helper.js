const {createClient} = require('redis')
const {REDIS_URL} = require('../Config/config');

const client = createClient(REDIS_URL)


const setJWT = async (key, value) => {
    await client.connect();
    try {
        await client.set(key, `${value}`, (err, res) => {
            if(err){
                return err;
            }

            return res;
        });
    } catch (error) {
        console.log(error);
        return error
    }
}


const getJWT = async (key) => {
    await client.connect();
    try {
        const userId = await client.get(key);
        return userId;
    } catch (error) {
        return error
    }
}

module.exports = {
    setJWT,
    getJWT,
}