const prisma = require('../config/db')
const jwt = require('jsonwebtoken')
const {
    validationResult,
    matchedData
} = require('express-validator');
const bcrypt = require('bcrypt')
const Client = prisma.client
class Manager {

    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({
                errors: errors.array()
            });

            const {
                name,
                lastname,
                phone,
                email,
                password,
                repass
            } = matchedData(req)
            const client = await Client.create({
                data: {
                    name,
                    lastname,
                    phone: req.body.phone,
                    email,
                    password
                }
            })
            const token = jwt.sign({
                id: client.id,
                phone: client.phone
            }, process.env.TOKEN_SECRET, {
                expiresIn: '1h'
            });
            return res.cookie('Client', token, {
                maxAge: 1200000,
                httpOnly: true
            }).send({
                token,
                id: client.id
            })
        } catch (e) {
            console.log(e)
            return res.status(401).send({
                error: e.data
            })
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({
                errors: errors.array()
            });
            const {
                email,
                password
            } = matchedData(req)
            const client = await Client.findFirst({
                where: {
                    email
                }
            })
            const validPassword = bcrypt.compareSync(password, client.password);
            if (!validPassword) return res.status(400).json({
                error: 'Неверный пароль'
            });

            const token = jwt.sign({
                id: client.id,
                phone: client.phone
            }, process.env.TOKEN_SECRET, {
                expiresIn: '1h'
            });
            return res.cookie('Client', token).send({
                token: token,
                id: client.id
            })
        } catch (e) {
            console.log(e)
            return res.status(405).send({
                error: e.data
            })
        }
    }
    async findAll(req, res) {
        const clients = await Client.findMany()
        return res.send(clients)
    }

    async findOne(req, res) {
        const client = await Client.findFirst({
            where: {
                id: req?.params?.id
            }
        })
        if (!client) return res.status(404).send({
            error: 'Wrong id'
        })
        return res.send(client)
    }

}
module.exports = new Manager()