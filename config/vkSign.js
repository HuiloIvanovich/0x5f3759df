const config = require('config');
const key = config.get('vkAppSecret');
const qs = require('querystring');
const crypto = require('crypto');

const validate = (params) => {
    const urlParams = params;
    const ordered = {};
    Object.keys(urlParams).sort().forEach((key) => {
        if (key.slice(0, 3) === 'vk_') {
            ordered[key] = urlParams[key];
        }
    });

    const stringParams = qs.stringify(ordered);
    const paramsHash = crypto
        .createHmac('sha256', key)
        .update(stringParams)
        .digest()
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=$/, '');

    return paramsHash === urlParams.sign;
};

module.exports = validate;