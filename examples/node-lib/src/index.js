const file = await import(`./file.js`).then(m => m.default)
console.log(file)
