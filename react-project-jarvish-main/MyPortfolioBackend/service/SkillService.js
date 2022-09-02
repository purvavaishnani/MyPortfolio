var Skills=require('../model/Skills');
const user = require('../model/user');
async function addSkill(data){
    console.log(data);
    await Skills.create(data,function(err,skill){
        if(err){
            return false;

        }
        else {
            return true;
        }
    });
}

async function updateSkill(data){
    console.log(data.id);
    //data.id or data.userId ??
    await Skills.findOneAndUpdate({'userId':data.id},data).then(function(err,skill){
        if(err){
            return false;

        }
        else {
            return true;
        }
    });
}
async function deleteSkill(id){
    console.log(id);
    await Skills.deleteOne({'userId':id}).then(function(err,skill){
        if(err){
            return false;

        }
        else {
            return true;
        }
    });
}

async function getSkillbyId(id){
    console.log("accessing GET METHOD:"+id);
    console.log(id);
    // await Skills.findOne({'userId':id}).exec().then(function(skill,err){
    //     if(err){
    //         return null;
    //     }
    //     else{
        const skill = await Skills.find({'userId':id})

             if(skill!=null){
                console.log(skill);
                return skill;
            }
            else{
                return null;
            }
        }
//     })
// }


exports.addSkill = addSkill;
exports.updateSkill = updateSkill;
exports.deleteSkill = deleteSkill;
exports.getSkillbyId = getSkillbyId;

