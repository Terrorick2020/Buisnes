const {Client} = require('../models/client')
const jwt = require('jsonwebtoken')
const {  validationResult, matchedData} = require('express-validator');
const bcrypt = require('bcrypt')

class Manager{
   
    async register(req, res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            
            const {firstname, lastname, email, password, repass} = matchedData(req)
            const Client = await Client.create({
                firstname,
                lastname,
                email,
                password
            })
            const token = jwt.sign({id:Client.id, email:Client.email}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            return res.cookie('Client',token, { maxAge: 1200000, httpOnly: true }).send({token,id:Client.id})
        }catch(e){
            console.log(e)
            return res.status(401).send({error:e.data})
        }
    }

    async login(req,res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const {email, password} = matchedData(req)
            const Client = await Client.findOne({where:{email}})
            const validPassword = bcrypt.compareSync(password, Client.password);
            if (!validPassword) return res.status(400).json({ error: 'Неверный пароль' });

            const token = jwt.sign({id:Client.id, email:Client.email}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            return res.cookie('Client',token).send({token:token,id:Client.id})
        }catch(e){
            console.log(e)
            return res.status(405).send({error:e.data})
        }
    }

    
} 
module.exports = new Manager()