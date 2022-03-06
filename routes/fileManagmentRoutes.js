const fs = require('fs')

function generateRandomString(numberOfCharachters = 12) {
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let value = ""
    for (let i = 0; i < numberOfCharachters; i++) {
        let randomIndex = Math.floor(Math.random() * string.length);
        value += string[randomIndex]
    }

    return value
}

module.exports = (app) => {
    app.post('/fileUpload/:type', (req, res) => {
        if (!req.params.type ) {
            res.status(403).send("no type or file supplied")
            return
        }

        if (!req.files) {
            res.status(403).send("no file supplied")
            return
        }
        let directories = fs.readdirSync(process.cwd() + '/public/uploadedFiles').map(x => x.toLowerCase())
        if (!directories.includes(req.params.type.toLowerCase())) {
            res.status(403).send("directory not found")
            return
        }
        let filePath = ''


        if (req.params.type == 'aboutme') {
            filePath = 'public/uploadedFiles/aboutMe/mainPicture.' + req.files.file.name.split('.').pop()
        } else {
            filePath = 'public/uploadedFiles/' + req.params.type + '/' + generateRandomString() + '.' + req.files.file.name.split('.').pop()

            while (fs.existsSync(filePath)) {
                filePath = 'public/uploadedFiles/' + req.params.type + '/' + generateRandomString() + '.' + req.files.file.name.split('.').pop()
            }
        }

        

        try {
            let WriteStream = fs.createWriteStream(process.cwd()+"/"+ filePath)
            WriteStream.write(req.files.file.data)
            WriteStream.close()
    
    
    
            res.json({
                fileName: req.files.file.name,
                filePath: filePath,
                mimeType: req.files.file.mimetype
    
            })
    
        } catch (error) {
            res.status(503).json({
                message:'error uploading file'
            })
            
        }

       
    })
    

}