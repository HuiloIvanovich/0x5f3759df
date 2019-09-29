const Travel = require('../../models/Travel');

const getPopular = async () => {
    try {
        const data = await Travel.find({isPopular: true});
        return data;
    } catch(err) {
        throw (err);
    }
};

module.exports = {getPopular};