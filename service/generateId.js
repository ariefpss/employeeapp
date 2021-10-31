const user = require('../models').users;
const {Op} = require('sequelize');

class generateId{

    async makeId (birthdate) {
        const YY = birthdate.slice(2,4);
        const MM = birthdate.slice(5,7);
        const yymmIp = YY.concat(MM);
        const yymmDt = await user.findAll({attributes: ['id']});

        if (yymmDt.id == null){
            let xxxx = '0000';
            let id = yymmIp.concat(xxxx)

            return id;
        };

        for (let i = 0; i <= yymmDt.length; i++) {
            let checkYyMm = yymmDt[i].id.toString().slice(0,4)

            if (checkYyMm == yymmIp){
                let lastDt = await user.findOne({ attributes: ['id'],
                    order: [ ['id','DESC'] ],
                    where: {
                        id : {
                            [Op.startsWith]: yymmIp
                        }
                    }
                });
                let sub = parseInt(lastDt.id) + 1;
                let xxxx = sub.toString().slice(4,8);
                let id = yymmIp.concat(xxxx);

                return id;
            } else if (checkYyMm != yymmIp){
                let xxxx = '0000';
                let id = yymmIp.concat(xxxx);

                return id;
            };
        };
    };
};

module.exports = generateId;