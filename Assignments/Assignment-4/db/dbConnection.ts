import mysql from 'mysql2'

const DB = mysql.createPool({
    host: process.env.HOST,  
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,   
    waitForConnections: true,
    connectionLimit: 10,    
    queueLimit: 0
});

export default DB.promise();