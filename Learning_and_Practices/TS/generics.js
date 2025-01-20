// Why we need Generics?
function firstElement(arr) {
    return arr[0];
}
var arr1 = [1, 2, 3];
var arr2 = ["1", "2", "3"];
firstElement(arr1);
firstElement(arr2);
// Here we want that all type of array is acceptable in the function and its give the return type based on the input type that received or passed in the argument.
// Here generics comes in the picture
// Generic Function Basics
function firstElement1(arr) {
    return arr[0];
}
firstElement1(arr1);
firstElement1(arr2);
var map = new Map(); // Default generics provided by TS.
var response = {
    data: {
        name: "",
        age: 0
    },
    isError: false
};
var ApiResponse = {
    data: {
        status: 200,
    },
    isError: false
};
