const Travel = require('../../models/Travel');

const getDaily = async () => {
    try {
        return await Travel.find({isDaily: true});
    } catch(err) {
        throw (err);
    }
};

module.exports = {getDaily};