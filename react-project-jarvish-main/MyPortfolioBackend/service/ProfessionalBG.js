var ProfessionalBG = require('../model/ProfessionalBG');

async function addField(data) {
    console.log(data+"4");
    await ProfessionalBG.create(data, function (err, result) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function deleteField(id) {
    await ProfessionalBG.remove({ '_id': id }).then(function (err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}


async function updateField(data, id) {
    await ProfessionalBG.findByIdAndUpdate({ '_id':data.id }, data, function (err, result) {
        if (err) {
            return "Error while updating";
        }
        else {
            return result;
        }
    });
}

async function getField(findId) {
    const result = await ProfessionalBG.findOne({ 'userId': findId });
    if (result != null) {
        return result;
    } else {
        return null;
    }
}


exports.addField = addField;
exports.deleteField = deleteField;
exports.updateField = updateField;
exports.getField =getField;