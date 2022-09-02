const user = require('../model/user');
var User = require('../model/user');
async function addUser(data) {
    console.log(data)
    await User.create(data, function (err, user) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function updateUser(email, data) {
    await User.findOneAndUpdate({ 'email': email }, data).then(function (User, err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function deleteUser(id) {
    await User.deleteOne({ '_id': id }).then(function (user, err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function getUserById(id) {
    const user = await User.findOne({ '_id': id });
    if (user != null) {
        return user;
    } else {
        return null;
    }
}

async function getUserByEmail(email) {
    const user = await User.findOne({ 'email': email });
    if (user != null) {
        return user;
    } else {
        return null;
    }
}

async function resetPassword(data) {
    const user = await User.findOne({ 'email': data.email });
    if (user != null) {
        if (data.oldPassword == user.password) {
            user.password = data.newPassword
            await User.findOneAndUpdate({ 'email': data.email }, user).then(function (User, err) {
                if (err) {
                    return false;
                }
                else {
                    return true;
                }
            });
        }
    } else {
        return null;
    }
}

exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.resetPassword = resetPassword;