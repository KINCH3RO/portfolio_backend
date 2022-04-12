require('dotenv').config()
const homeRoutes = require('./routes/mainRoutes');
const emailRoutes = require('./routes/emailRoutes');
const authRoutes = require('./routes/authRoutes');
const fileManagmentRoutes = require('./routes/fileManagmentRoutes');
const statsRoutes =require('./routes/statsRoutes');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload= require('express-fileupload')
const app = express()
var corsOptions = {
    origin: process.env.ORIGIN || '**',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



app.use('/public', express.static(process.cwd()+"/public"))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(fileUpload())





//don't change the order of the route security middleWare exist on home routes
statsRoutes(app);
authRoutes(app)
emailRoutes(app)
homeRoutes(app)
fileManagmentRoutes(app)


app.get('/', (req, res) => {
    res.send('server working')
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("app listening on port : " + PORT);
})