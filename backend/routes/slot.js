const router = require('express').Router();
const Slot = require('../model/Slot')


router.post('/book',async(req,res) => {

    const slot = new Slot({
        name:req.body.name,
        email:req.body.email,
        date:Date.parse(req.body.date)
    });
    try{
        const bookSlot = await slot.save();
        res.send('slot booked!')
    } catch (err){
        res.status(400).send(err);
    }
});

router.get('/', async(req,res) => {
    res.send('data is here its working')
    // Slot.find()
    //     .then(slots => res.json(slots))
    //     .catch(err => res.status(400).json('Error ' +err))
})


module.exports = router;