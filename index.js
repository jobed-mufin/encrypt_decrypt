const express = require('express');
const swaggerUi = require('swagger-ui-express');

const service = require('./crypt.js');
const swagger =require( './swagger.js');

const app = express();
app.use(express.json());
const port = 3345;

const middleware = (req, res, next) => {
    const key = req.query['key']|| req.headers['key'];
    const iv = req.query['iv']|| req.headers['iv'];
    if (!key || !iv) {
        return res.status(400).json({status:"error",message:"Key and IV are required"});
    }
    req.keys = {key,iv};
    next();
}

app.use('/api-docs', swagger);
app.get('/', (req, res) => {
    res.status(200).json({status:"success",message:'Welcome to sir_obed encryption server!'});
    })

app.post('/encrypt',middleware, (req, res) => {
    const data = req.body;
    const encryptedData = service.encryptData(data,null,req.keys);
    res.status(200).json({status:"success",message:encryptedData})
}
)

app.post('/decrypt',middleware, (req, res) => {
    const data = req.body;
    if (!data.data && !data.encryptedText) {
       return  res.status(400).json({status:"error",message:"Data to decrypt is required"});
    }
    const decryptedData = service.decryptData(data,null,req.keys);
    if(decryptedData.includes("Invalid parameters")){
        return res.status(400).json({status:"error",message:decryptedData})
    }

    res.status(200).json({status:"success",decryptedData:decryptedData})

}
)

app.listen(port, () => {
    console.log(`http://localhost:${port}/api-docs`);
    }
)