const functions = require("firebase-functions");
const{dialogflow} = require("actions-on-google");

const app = dialogflow();
let actionChoice = "";

app.intent("actionSelect",(conv,params)=>{
    //conv.data.actionChoice = params.action;
    actionChoice = params.action;
});

app.intent("bodypartSelect",(conv,params)=>{
    let result = "";
    if(actionChoice == "repair"){
        result = "Your technician will come to your address on the Earth in 2 hours. Thank you for choosing Sybo Technology!";
    }else if(actionChoice == "return"){
        result = "I'm sorry to hear that! A return label and instruction has been sent to your email. We will process the refund as soon as we receive the returned " + params.bodypart;
    }else if(actionChoice == "order"){
        result = "Your new " + params.bodypart + " will be arriving in 2 business days.Thank you for choosing Sybo Technology!";
    }else if(actionChoice == "replace"){
        result = "I'm sorry to hear that! A return label and instruction has been sent to your email. We will send you a new " + params.bodypart + " as soon as we receive the returned object" ;
    }
    conv.close(`So you want to ${actionChoice} the ${params.bodypart}. ${result} Goodbye!`);
});

exports.CyborgBot = functions.https.onRequest(app);