//test.js
var stringy = require('./stringy.js');
var MutableString = stringy.MutableString;
var Palindrome = stringy.Palindrome;


console.log("testing MutableString constructor\n-----");
var s = new MutableString("hello");
console.log(s.toString());

console.log("\ntesting charAt\n-----");
console.log(s.charAt(4));
console.log(s.charAt(-1));
console.log(s.charAt(-5));
console.log(s.charAt(-7));
console.log(s.charAt(7));

console.log("\ntesting toCharArray\n-----");
console.log(s.toCharArray());

console.log("\ntesting concat\n-----");
s.concat(" world!");
console.log(s.toString());

console.log("\ntesting set\n-----");
s.set(0, 'c');
console.log(s.toString());
s.set(-1, '?');
console.log(s.toString());
s.set(-100, 'X');
console.log(s.toString());
s.set(-1, 'd', -2, 'e', -3, 'k');
console.log(s.toString());
s.set(0, 'b', -100, 'X', -101, 'Y', 4, 's', 5 );
console.log(s.toString());


console.log("\ntesting Palindrome constructor\n-----");
var p1 = new Palindrome('minim');
console.log(p1.toString());

console.log("\ntesting charAt\n-----");
console.log(p1.charAt(0));
console.log(p1.charAt(-1));



console.log("\ntesting set\n-----");
p1.set(1, 'a', 2, 'd', 3, 'a');

console.log(p1.toString());

console.log("\ntesting set with exception\n-----");
try {
  p1.set(0, 1);
} catch(e) {
  console.log('exception caught: ' + e.message);
}

console.log("\ntesting toCharArray\n-----");
console.log(p1.toCharArray());

console.log("\ntesting concat\n-----");
p1.concat('imadam');
console.log(p1.toString());

console.log("\ntesting concat exception:\n-----");
try {
  p1.concat('!');
} catch(e) {
  console.log('exception caught: ' + e.message);
}

console.log("\ntesting constructor exception\n-----");
try {
  var p2 = new Palindrome('car');
} catch(e) {
  console.log('Exception caught: ' + e.message);
}
