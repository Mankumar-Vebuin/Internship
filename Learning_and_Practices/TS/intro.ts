
// ReadOnly and ? keyword
type user = {
    readonly _id: string,
    name: string,
    email: string,
    Mobile: number,
    cardDetails?: string
}

let myUser: user = {
    _id: "1",
    name: "abc",
    email: "a@a.com",
    Mobile: 1111111111
}