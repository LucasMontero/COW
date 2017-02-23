
// ERRORS

module.exports.unknownErrorToast = function(err){
  return {
     "toast" : {
          "result" : "error",
          "message": "An unknown error has occurred. Try again later.",
          "error"  : err
      }
    };
}

module.exports.allFieldsRequiredToast = function(){
  return {
    "toast" : {
        "result" : "error",
        "message": "All fields required."
    }
  };
}

module.exports.invalidLoginToast = function(){
  return {
    "toast" : {
        "result" : "error",
        "message": "Invalid user or password."
    }
  };
}

//CONFIRMATIONS

module.exports.elementTaskCorrectly = function(element, task){
  return {
    "toast" : {
        "result" : "ok",
        "message": element +" "+ task + " correctly."
    }
  };
}
