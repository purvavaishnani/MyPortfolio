var Interest = require('../model/Interest');

async function addInterest(data) {
    await Interest.create(data, function (err, result) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function deleteInterest(id) {
    await Interest.remove({ 'userId': id }).then(function (err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}


async function getInterest(id) {
    const result = await Interest.findOne({ 'userId': id });
    if (result != null) {
        return result;
    } else {
        return null;
    }
}


exports.addInterest = addInterest;
exports.deleteInterest = deleteInterest;
exports.getInterest =getInterest;