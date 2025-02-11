export const getNumber = (val: string) => {
    if(val === undefined){
        return val;
    }
    return Number(process.env[val])
}

export const getString = (val: string) => {
    if(val === undefined){
        return val;
    }
    return String(process.env[val])
}

export const getBoolean = (val: string) => {
    if(val === undefined){
        return val;
    }
    return Boolean(process.env[val])
}