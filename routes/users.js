var express = require('express');
var router = express.Router();

var User = require('../models').users;
var Makeid = require('../service/generateId');


//TODO: Get page

//todo: get all user
router.get('/', (req, res) => {
  User.findAll()
      .then((user)=>{
        res.render('index', { title: 'App Employee', users: user});
      });
});

router.get('/adduser', (req, res) => {
  res.render('user/adduser', {title: 'App Employee'});
});


//TODO: Activity CUD users
router.post('/adduser', async(req, res, next) => {
  const generateid = new Makeid();

  const _id = await generateid.makeId(req.body.birthdate);

  const createuser = await User.build({
    id: _id,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    birthdate: req.body.birthdate,
    address: req.body.address
  });

  await createuser.save();

  res.redirect('back');


});



module.exports = router;