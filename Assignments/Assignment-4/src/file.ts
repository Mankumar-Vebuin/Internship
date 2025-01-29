import file from 'fs';

// Sync
file.writeFileSync("./text.txt", "Hello");
const result = file.readFileSync("./text.txt", "utf-8");
console.log(result);
file.appendFileSync("./text.txt", "This and that");

// Async
file.writeFile("./text.txt", "Hello", (e) => {});
file.readFile("./text.txt", "utf-8" ,(err, result) => {
    console.log(result);
})
