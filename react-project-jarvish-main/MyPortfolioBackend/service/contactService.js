var Contact = require('../model/Contact');
async function addContact(data) {
    console.log(data)
    await Contact.create(data, function (err, contact) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}


async function updateContact(email, data) {
    console.log(data.id )
    await Contact.findOneAndUpdate({ 'userId':data.id },data).then(function(err,contact){
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}

async function deleteContact(id) {
    console.log(id);
    await Contact.deleteOne({ 'userId': id }).then(function (contact, err) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}


async function getContactById(id) {
    const contact = await Contact.find({'userId':id})
    if (contact != null) {
        return contact;
    } else {
        return null;
    }
}


exports.addContact = addContact;
exports.updateContact = updateContact;
exports.deleteContact= deleteContact;
exports.getContactById = getContactById;