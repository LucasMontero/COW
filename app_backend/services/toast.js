
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
        "message": "Oh, cow! Path can only containt alphanumeric characters, & and  _"
    }
  };
}

module.exports.cantDeleteIndex = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "The index page can't be deleted as sure as a cow eat candy and rainbows"
    }
  };
}

//**mailing**

module.exports.wrongMailParameters = function(){
  return {
    "toast" : {
        "status" : "error",
        "message": "Ai caramba!The parameters on mail provider server are invalid."
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
