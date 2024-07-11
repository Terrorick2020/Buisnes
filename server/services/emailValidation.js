const prisma=require('../config/db')
const Client = prisma.client
class EmailValidation{
    async notInUse(value){
        const user = await Client.findFirst({where:{phone:value}});
        if (!user) {
          throw new Error('E-mail не используется');
        }
    }
    async isInUse(value){
        const user = await Client.findFirst({where:{phone:value}});
        if (user) {
          throw new Error('E-mail уже используется');
        }
    }
}
module.exports = new EmailValidation()
