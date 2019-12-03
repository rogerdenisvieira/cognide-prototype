var express = require("express");
var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

console.log('A request has been received.');

app.get("/metrics", (req, res, next) => {

    var metrics = {
        "attention": Math.random() * 100 ,
        "meditation": Math.random() * 100,
        "alpha": Math.random(),
        "beta": Math.random(),
        "gama":Math.random(),
        "delta":Math.random(),
        "theta":Math.random()
    }

    console.log(`Sending response: ${JSON.stringify(metrics)}`)

    res.json(metrics);

});