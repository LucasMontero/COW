
// ERRORS

module.exports.unknownErrorToast = function(err){
  return {
     "toast" : {
          "status" : "error",
          "message": "Holy cow! An unknown error has occurred. Try again later.",
          "error"  : err
      }
    };
}

module.exports.allFieldsRequiredToast = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "All fields required."
    }
  };
}

module.exports.invalidLoginToast = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "Invalid credentials."
    }
  };
}

//CONFIRMATIONS

module.exports.elementTaskCorrectly = function(element, task){
  return {
    "toast" : {
        "status" : "ok",
        "message": element +" "+ task + " correctly."
    }
  };
}
