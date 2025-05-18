const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get('/', async(req,res) =>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/:tastetype', async(req,res) =>{
    try{
        const tastetype = req.params.tastetype;
        if(tastetype == "sweet" || tastetype == "spicy" || tastetype == "sour"){
            const data = await MenuItem.find({taste:tastetype});
            console.log('data fetched');
            res.status(200).json(data);

        }
        else{
            console.log('Invalid taste type');
            res.status(404).json({error:'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.put('/:id', async(req,res) => {
    try{
        const menuid = req.params.id;
        const data = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuid, data, {
            new : true,
            runValidators : true,
        })
        if(!response){
            res.status(404).json({error:"Menu item not found"})
        }
        console.log('data updated');
        res.status(200).json("Data updated successfully", response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
    
})

router.delete('/:id', async(req,res) => {
    try{
        const menuid = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuid);
       if(!response){
        res.status(404).json({error:"Menu item not found"})
       }
       console.log('data deleted');
       res.status(200).json({message:"Data deleted successfully"});
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:"Internal Server Error"})

    }
})
     

//comment added for testing purpose
module.exports = router;