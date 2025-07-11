let string = "Jose";
let number = 1234567890;
let isBlocked = false;
let user;
let nullDate = null;
let symbol1 = Symbol();
let bigNumber = 3n ** 4n;

console.groupCollapsed("Original Values");
console.log("isBlocked:", isBlocked);
console.log("string:", string);
console.log("number:", number);
console.info("user:", user);
console.info("nullDate:", nullDate);
console.error("symbol1:", symbol1);
console.error("bigNumber:", bigNumber);
console.groupEnd();


string = "Carlos";
number = 987654321;
isBlocked = true;
user = "newUser";
nullDate = new Date();
symbol1 = Symbol("updated");
bigNumber = 5n ** 3n;

console.groupCollapsed("Values Updated");
console.debug("isBlocked:", isBlocked);
console.debug("string:", string);
console.debug("number:", number);
console.error("user:", user);
console.error("nullDate:", nullDate);
console.info("symbol1:", symbol1);
console.info("bigNumber:", bigNumber);

console.groupEnd();

