
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const db = new JsonDB(new Config("database/stats", true, false, '/'));

module.exports = (app) => {

    //realtime user views implement here

    //end
    app.put("/stats/setTotal", (req, res) => {
        if (!db.exists("/total")) {
            db.push("/total", 1)
            res.json({ message: "done" });
            return
        }

        db.push("/total", parseInt(db.getData("/total")) + 1)
        res.json({ message: "done" });
    })

    app.put("/stats/setResume", (req, res) => {
        if (!db.exists("/resume")) {
            db.push("/resume", 1)
            res.json({ message: "done" });
            return
        }

        db.push("/resume", parseInt(db.getData("/resume")) + 1)
        res.json({ message: "done" });
    })

    app.get("/stats/getTotal", (req, res) => {
        if (!db.exists("/total")) {
            res.json({ total: 0 })
            return
        }

        res.json({ total: db.getData("/total") })
    })

    app.get("/stats/getResume", (req, res) => {
        if (!db.exists("/resume")) {
            res.json({ resume: 0 })
            return
        }

        res.json({ resume: db.getData("/resume") })

    })


    app.put("/stats/setProjects", (req, res) => {
        if (!db.exists("/projects")) {
            db.push("/projects", 1)
            res.json({ message: "done" });
            return
        }

        db.push("/projects", parseInt(db.getData("/projects")) + 1)
        res.json({ message: "done" });
    })


    app.get("/stats/getProjects", (req, res) => {
        if (!db.exists("/projects")) {
            res.json({ projects: 0 })
            return
        }

        res.json({ projects: db.getData("/projects") })

    })



}