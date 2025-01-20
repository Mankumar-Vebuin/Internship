// Why we need Generics?
function firstElement(arr: (number | string)[]) {
  return arr[0];
}

const arr1: number[] = [1, 2, 3];
const arr2: string[] = ["1", "2", "3"];

firstElement(arr1);
firstElement(arr2);

// Here we want that all type of array is acceptable in the function and its give the return type based on the input type that received or passed in the argument.
// Here generics comes in the picture

// Generic Function Basics

function firstElement1<t>(arr: t[]) {
  return arr[0];
}

firstElement1(arr1);
firstElement1(arr2);

const map = new Map<string, number>(); // Default generics provided by TS.

// UseCase
type apiResponse<Data extends Object> = {
  data: Data;
  isError: boolean;
};

type userResponse = apiResponse<{ name: string; age: number }>;
type blogResponse = apiResponse<{ title: string }>;
type statusResponse = apiResponse<{ status: number }>;

const response: userResponse = {
    data: {
        name: "",
        age: 0
    },
    isError: false
}

const ApiResponse: apiResponse<{status: number}> = {
    data: {
        status: 200,
    },
    isError: false
}


