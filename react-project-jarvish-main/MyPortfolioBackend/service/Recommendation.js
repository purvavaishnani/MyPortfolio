var Recommendation = require('../model/Recommendation');

async function addRecommendation(data) {
    await Recommendation.create(data, function (err, result) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function deleteRecommendation(data) {
    await Recommendation.remove({
            emailID : data.emailID}
        , function (err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function updateRecommendation(data, updateId) {
    await Recommendation.findByIdAndUpdate(
        updateId, data
        , function (err, result) {
        if (err) {
            return "Error while updating...";
        }
        else {
            return result;
        }
    });
}

async function getRecommendation(findId) {
    const result = await Recommendation.findOne({ 'userId': findId });
    if (result != null) {
        return result;
    } else {
        return null;
    }
}

exports.addRecommendation = addRecommendation;
exports.deleteRecommendation = deleteRecommendation;
exports.updateRecommendation = updateRecommendation;
exports.getRecommendation =getRecommendation;