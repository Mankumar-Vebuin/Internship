// type
type UserType = {
    name: string,
    age: number
}

// interface
interface User {
    name: string,
    age: string
}


type Stype = string
//! interface S = string    
// You can't do this with interfaces 
// everything must be in the object formate in interfaces.


type Utype = {email: string} | {phone: number}
interface U {
    email: string, 
}
//! Union of two types does not supported in Interfaces.


interface user {
    name: string
}
interface user {
    age: number
}

const FirstUser: user = {
    name: "First",
    age: 16
} 

// type Ptype = {
//     name: string
// }
// type Ptype = {
//     age: number,
// }
//! You can not redeclare or merge to types but you can merge two interfaces.
