var express = require("express");
var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

console.log('A request has been received.');

app.get("/metrics", (req, res, next) => {

        
    attention =  ((Math.random() * 255) * 100 / 255).toFixed(2);

    var metrics = {

        eSense: {

            "attention": ((Math.random() * 255) * 100 / 255),
            "meditation": ((Math.random() * 255) * 100 / 255)
        },
        eegPower: {
            "alpha": Math.random(),
            "beta": Math.random(),
            "gama":Math.random(),
            "delta":Math.random(),
            "theta":Math.random()
        }
    }

    console.log(`Sending response: ${JSON.stringify(metrics)}`)

    res.json(metrics);

});