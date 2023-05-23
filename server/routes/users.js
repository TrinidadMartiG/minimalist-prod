const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/users', async (req, res) => {
const {name, email, password} = req.body;
 try{
     let user = new User({name, email, password});
     await user.save();
     console.log('New user created', user);
     res.status(201).json(user);
 } catch (err){
    console.error(err);
    res.statuts(500).send('server error')
 }
    
});

module.exports = router;