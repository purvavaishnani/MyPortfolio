var EducationalBG = require('../model/EducationalBG');

async function addCourse(data) {
    await EducationalBG.create( data, function(err, result) {
        if(err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function deleteCourse(id) {
    await EducationalBG.deleteOne({ '_id': id }).then(function (result, err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function getCourse(id) {
    const result = await EducationalBG.findOne({ 'userId': id });
    if (result != null) {
        return result;
    } else {
        return null;
    }
}

exports.addCourse = addCourse;
exports.deleteCourse = deleteCourse;
exports.getCourse = getCourse;