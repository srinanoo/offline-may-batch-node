let http = require('http');
let url = require('url');

// http.createServer((req, res) => {
//     res.end("This is my Node Code");
// }).listen(4000, () => {
//     console.log("Server is running at port No: 4000");
// });

const mongodb = require('mongodb').MongoClient;
const dbConn = "mongodb://localhost:27017";

http.createServer((req, res) => {
    if(req.url != "/favicon.ico") {
        mongodb.connect(dbConn, async (err, db) => {
            if(err) throw err;
    
            const conn = db.db("students");
            console.log("Database Connected!");
    
            // const collections = await conn.listCollections().toArray();
            // // console.log(collections);
            // // let collectionArr = collections.map((v) => (v.name == "ecommerce") ? v.name : "");
            // let flag = true;
            // collections.forEach((v) => (v.name == "ecommerce6") ? flag=false : "");
            // console.log(flag);
            // // if(collectionArr.find(""))
            // // collectionArr.forEach((v) => {
            // //     console.log("Data = " + v);
            // // });
            // if(flag) {
            //     conn.createCollection("ecommerce6", (err, res1)=> {
            //         if(err) throw err;
            //         console.log(res1);
            //         res.end();
            //     });
            // }

            let qry = url.parse(req.url, true).query;
            console.log(qry);

            // let data = {};
            // if(qry.name!="") data.name = qry.name;
            // if(qry.ssid!="") data.ssid = qry.ssid;
            // if(qry.dt!="") data.dateJoined = qry.dt;

            let data = {
                name: qry.name,
                ssid: qry.ssid,
                dateJoined: qry.dt
            }

            console.log(data);

            // conn.collection("socialnetwork").insertOne(data, (err, res2) => {
            //     if(err) throw err;

            //     console.log(res2);
            //     res.end();
            // });

            conn.collection("socialnetwork").find(data).toArray((err, res3) => {
                if(err) throw err;

                console.log(res3);
                res.end();
            });

    
            res.end();
        });
        res.end();
    }
}).listen(4000, () => {
    console.log("Server is running at port No: 4000");
});