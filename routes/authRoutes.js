require('dotenv').config()
const axios = require('axios')

module.exports = (app) => {
    app.get("/auth/callback", (req, res) => {

        const requestToken = req.query.code;
        axios({
            // make a POST request
            method: "post",
            data: {
                "client_id": process.env.client_id,
                "client_secret": process.env.client_secret,
                "code": requestToken
            },
            // and request token
            url: `https://github.com/login/oauth/access_token`,
            // Set the content type header, so that we get the response in JSO
            headers: {
                accept: "application/json",
            },
        }).then((response) => {

            res.redirect(process.env.ORIGIN+"/settingPanel/auth/callback?token=" + response.data.access_token)
        });
    });

    app.get('/auth/checkUser', (req, res) => {
        let userId= req.query.userId
        if(!userId){
            res.status(400).send('Bad Authentification Request')
            return
        }

        if(userId==process.env.userId){
            res.status(200).send('Authorized')
        }else{
            res.status(403).send('Not Authorized')
        }
    })
}