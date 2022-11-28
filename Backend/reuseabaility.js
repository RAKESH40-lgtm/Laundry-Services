const e = require("express");
const registerModals = require("./Schema/registerSchema/register")

const checkExistingMail = async(email)=>
{
    let exist = false;
    await registerModals.find({email:email}).then((userdata)=>{
        if(userdata.length)
        {
            exist = true;
        }
    })
    return exist;
}
module.exports = checkExistingMail;