const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const clientRouter = require('./routers/clientRouter.js')

app.use(express.json());
app.get('/',(req,res)=>{return res.send('hi')})
app.use('/client', clientRouter)

app.listen(PORT, () => {
    console.log(process.env.TOKEN_SECRET)
    console.log(`Server is running on port ${PORT}`);
});