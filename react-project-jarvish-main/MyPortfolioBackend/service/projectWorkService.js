var ProjectWork = require('../model/ProjectWork');
async function addProjectWork(data) {
    console.log(data)
    await ProjectWork.create(data, function (err, projectWork) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function updateProjectWork(data) {
    console.log(data.id )
    await ProjectWork.findOneAndUpdate({ 'userId':data.id }, data).then(function (ProjectWork, err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function deleteProjectWork(id) {
    console.log(id);
    await ProjectWork.deleteOne({ 'userId': id }).then(function (projectWork, err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function getProjectWorkById(id) {
    console.log(id);

  

        const projectWork = await ProjectWork.find({'userId':id})

             if(projectWork!=null){
                console.log(projectWork);
                return projectWork;
            }
            else{
                return null;
            }
        }
  

exports.addProjectWork = addProjectWork;
exports.updateProjectWork = updateProjectWork;
exports.deleteProjectWork = deleteProjectWork;
exports.getProjectWorkById = getProjectWorkById;