var Certification = require('../model/Certification');

async function addCertification(data) {
    await Certification.create(data, function (err, result) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function deleteCertification(data) {
    await Certification.remove({
        _id : data._id}
        , function (err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function updateCertification(data, updateId) {
    await Certification.findByIdAndUpdate(
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

async function getCertification(findId) {
    const result = await Certification.findOne({ 'userId': findId });
    if (result != null) {
        return result;
    } else {
        return null;
    }
}

exports.addCertification = addCertification;
exports.deleteCertification = deleteCertification;
exports.updateCertification = updateCertification;
exports.getCertification =getCertification;