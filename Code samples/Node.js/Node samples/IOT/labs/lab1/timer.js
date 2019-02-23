function callbackFunc(a = 1 ,b = 2) {
    console.log("2 seconds later... answer is " + (a*b));
}
setTimeout(callbackFunc, 2000);

//next line gets executed while waiting for the delay to complete
console.log("this is executed while waiting for the callback function");
