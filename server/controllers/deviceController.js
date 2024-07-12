const prisma = require('../config/db')
const Dto = require('../dto/deviceCreateDto')
class DeviceController {
    async create(req, res) {
        try {
            if (!req.body instanceof Dto)
                return res.status(407).send({
                    error: 'error'
                })
            const device = await prisma.device.create({
                data: req.body
            })
            return res.send(device)
        } catch (error) {
            return res.status(404).send({
                error: error.data
            })
        }

    }
    async findAll(req, res) {
        try {
            const devices = await prisma.device.findMany()
            return res.send(devices)
        } catch (error) {
            return res.status(404).send({
                error: error.data
            })
        }

    }
    async findOne(req, res) {
        try {
            const device = await prisma.device.findFirst({
                where: {
                    id: req?.params?.id
                }
            })
            return res.send(device)
        } catch (error) {
            return res.status(404).send({
                error: error.data
            })
        }

    }
    async update(req, res){
        try {
            const device = await prisma.device.update({data:req.body, where:{id:req.params.id}})
            return res.send(device)
        } catch (error) {
            return res.status(404).send({
                error: error.data
            })
        }
    }
    async remove(req,res){
        try {
            await prisma.device.delete({where:{id:req?.params?.id}})
            return res.send({msg:'removed'})
        } catch (error) {
            return res.status(404).send({
                error: error.data
            })
        }
    }
}