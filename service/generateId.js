const user = require('../models').users;

class generateId{

    async makeId (birthdate) {
        const lastDt = await user.findOne({attributes: ['id'], limit: 1, order: [ ['id', 'DESC']]});
        
        const YY = birthdate.slice(2,4);
        const MM = birthdate.slice(5,7);
        const yymm = YY.concat(MM);
        
        const lstyymm = lastDt.id.toString().slice(0,4);

        if (!lastDt.id) {
            let xxxx = '0000';
            let id = yymm.concat(xxxx);

            return id;
        }else if (lstyymm == yymm) {
            let sub = parseInt(lastDt.id)+1;
            let xxxx = sub.toString().slice(4,8);
            let id = yymm.concat(xxxx);

            return id;
        }else {
            let xxxx = lastDt.id.toString().slice(4,8);
            let id = yymm.concat(xxxx)
            
            return id;
        }
    }
}

module.exports = generateId;