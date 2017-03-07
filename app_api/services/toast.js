
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

module.exports.fieldRequiredToast = function(field){
  return {
    "toast" : {
        "status" : "error",
        "message": field + " field is required."
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

//**pages**

module.exports.errorInPath = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "Path can only containt alphanumeric characters, & and  _"
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
