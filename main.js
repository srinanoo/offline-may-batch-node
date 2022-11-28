const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('mongodb').MongoClient;
const dbConn = "mongodb://localhost:27017";
let url = require('url');

app.use(cors());

app.get("/", (req, res) => {
    res.send("First Node Root route!")
});

app.get("/createUser", (req, res) => {
    res.send("Function to create a new User!")
});

app.get("/updateUser", (req, res) => {
    res.send("Function to update an existing User!")
});

app.get("/deleteUser", (req, res) => {
    res.send("Function to delete an existing User!")
});

app.get("/showUser", (req, res) => {
    // res.send("Function to show all Users!");
    mongodb.connect(dbConn, async (err, db) => {
        if(err) throw err;

        const conn = db.db("students");
        console.log("Database Connected!");

        let qry = url.parse(req.url, true).query;
        console.log(qry);

        let data = {};
        console.log(typeof qry.ssid);
        if(qry.name!="" && qry.name!= undefined) data.name = qry.name;
        if(qry.ssid!="" && qry.ssid!= undefined) data.ssid = qry.ssid;
        if(qry.dt!="" && qry.dt!= undefined) data.dateJoined = qry.dt;

        // let data = {
        //     name: qry.name
        // }

        conn.collection("socialnetwork").find(data).toArray((err, res3) => {
            if(err) throw err;

            console.log(res3);
            res.send(JSON.stringify(res3));
        });
    });
});




app.listen(5001, () => {
    console.log("Server is listening to port : 5001");
})