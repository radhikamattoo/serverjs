//stringy.js
/*
Radhika Mattoo, rm3485@nyu.edu
Applied Internet Tech Spring 2016
Homework 3
*/

module.exports.Palindrome = Palindrome;
module.exports.MutableString = MutableString;

//-------------------Helper Functions/Exception Objects-----------------------//

//Exception object for Palindrome
function BrokenSymmetryException(message){
  this.message = message;
  this.name = "BrokenSymmetryException";
}

//Exception object for invalid index
function InvalidIndexException(message){
  this.message = message;
  this.name = "InvalidIndexException";
}

//Helper: change negative index to positive
function cleanIndex(index, string){
 if(index < 0){
    return index + string.length;
  }else return index;
}

//Helper: valid index
function validIndex(i, string){
  //-length up to length-1 are valid
  var length = string.length;
  if(isNaN(i)){ return false; } //obvi has to be a num
  if(i >= -length && i <= length-1){
    return true;
  }else return false;
}

//Helper: function to check a string's symmetry
function checkSymmetry(string){
  var reverseArray = string.split("").reverse();
  var reverse = reverseArray.join("");
  if(string == reverse) {return true;}
  else { return false; }
}

//Helper: check valid character (in case set() params are odd)
function checkChar(char){
  if(char === null || char === undefined) return false;
  return true;
}

//------------------------------MutableString---------------------------------//


//MutableString constructor
function MutableString(string){
  if(string !== ""){
    this.string = string;
  }else{ return null; } //empty strings not supported
}

//concat
MutableString.prototype.concat = function(s){
  this.string += s;
};

//charAt
MutableString.prototype.charAt = function(i){
  if(validIndex(i, this.string)){
    var returnChar;
    i = cleanIndex(i, this.string);
    returnChar = this.string[i];
    return returnChar;
  }else return undefined;
};

//set(...)
MutableString.prototype.set = function(i, ch){ //set character at index i to ch
  for(var j = 0; j < arguments.length; j+= 2){
    //if valid index, assign char
    if(validIndex(arguments[j], this.string)){
      var index = cleanIndex(arguments[j], this.string);
      var char = arguments[j+1];
      //check for valid char
      if(checkChar(char)){
        this.string = this.string.substr(0, index) + char + this.string.substring(index+1);
      }
    }
    //ignore pair if there are any errors (aka any of the if statements fail)
  }

};

//tostring()
MutableString.prototype.toString = function(){
  return this.string;
};

//toCharArray()
MutableString.prototype.toCharArray = function(){
  var array = [];
  for(var i = 0; i < this.string.length; i++){
    array.push(this.string[i]);
  }
  return array;
};

//-----------------------------Palindrome------------------------------------//


//set up inheritance
Palindrome.prototype = Object.create(MutableString.prototype);
Palindrome.constructor.prototype = Palindrome;

//constructor
function Palindrome(string){
  if(checkSymmetry(string)){
    MutableString.call(this,string);
  }else{
    throw new BrokenSymmetryException("Result from constructor assymmetric");
  }
}

//set
Palindrome.prototype.set = function(i, ch){
    var tester = this.string;
    for(var j = 0; j < arguments.length; j+= 2){
      //if valid index, assign char
      if(validIndex(arguments[j], this.string)){
        var index = cleanIndex(arguments[j], this.string);
        var char = arguments[j+1];

        //char check
        if(checkChar(char)){
          tester = tester.substr(0, index) + char + tester.substring(index+1);
        }
      }
    }
    //add symmetry check
    if(checkSymmetry(tester)){
      this.string = tester;
    }else{
      throw new BrokenSymmetryException("Result from set assymmetric");
    }
};

//concat
Palindrome.prototype.concat = function(s){
    var tester = this.string + s;
    if(checkSymmetry(tester)){
          this.string += s;
    }else{
      throw new BrokenSymmetryException("Result from concat assymetric");
    }
};
