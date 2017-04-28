
// ERRORS

module.exports.unknownErrorToast = function(){
  return {
     "toast" : {
          "status" : "error",
          "message": "Holy cow! An unknown error has occurred. Try again later.",
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
        "message": "Hey lazybones! All fields are required."
    }
  };
}

module.exports.invalidLoginToast = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "Oh my cow! That credentials are invalid."
    }
  };
}

module.exports.userDoenstExitsInDBToast = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "For cow sake! The indicate user doesn't exits."
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

module.exports.cantDeleteIndex = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "The index page cant be deleted"
    }
  };
}

//**mailing**

module.exports.wrongMailParameters = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "Invalid parameters on mail provider server."
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
