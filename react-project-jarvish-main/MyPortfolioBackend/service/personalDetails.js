var PersonalDetails = require("../model/personalDetails");
async function addPersonalDetails(data) {
  console.log(data);
  const user = await getUserPersonalDetailsById(data.userId);
  if (user) {
    updateUsersPersonalDetails(data);
  } else {
    await PersonalDetails.create(data, function (err, user) {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  }
}

async function updateUsersPersonalDetails(data) {
  console.log(data.id);
  await PersonalDetails.findOneAndUpdate({ userId: data.userId }, data).then(
    function (User, err) {
      if (err) {
        return false;
      } else {
        return true;
      }
    }
  );
}

async function deleteUsersPersonalDetails(id) {
  console.log(id);

  await personalDetails.deleteOne({ userId: id }).then(function (user, err) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
}

async function getUserPersonalDetailsById(id) {
  console.log(id);
  const personalDetails = await PersonalDetails.findOne({ userId: id });
  if (personalDetails != null) {
    return personalDetails;
  } else {
    return null;
  }
}

exports.addPersonalDetails = addPersonalDetails;
exports.updateUsersPersonalDetails = updateUsersPersonalDetails;
exports.deleteUsersPersonalDetails = deleteUsersPersonalDetails;
exports.getUserPersonalDetailsById = getUserPersonalDetailsById;
