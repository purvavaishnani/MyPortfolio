var Experience = require('../model/Experience');
async function addExperience(data){
    console.log(data)
    await Experience.create(data,function(err,experience){
        if(err){
            return false;

        }
        else{
            return true;
        }
    })
}

async function updateExperience(data){
    console.log(data.id)
    await Experience.findOneAndUpdate({ 'userId':data.id },data).then(function(err,experience){
        if(err){
            return false;

        }
        else{
            return true;
        }
    });
}

async function deleteExperience(id) {
    console.log(id);
    await Experience.deleteOne({ 'userId': id }).then(function (experience, err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function getExperienceById(id) {
    console.log("accessing GET METHOD:"+id);

    const experience =await Experience.find({'userId':id})
            if (experience != null) {
                console.log("Returning experience:"+experience);
                return experience;
            } else {
                return null;
            }
        }


exports.addExperience = addExperience;
exports.updateExperience = updateExperience;
exports.deleteExperience = deleteExperience;
exports.getExperienceById = getExperienceById;








