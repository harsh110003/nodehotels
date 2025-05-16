const express = require('express')
const router = express.Router();
const Person = require('./../models/Person');
router.post('/', async(req,res) => {
    try{
        const data = req.body; //assuming the request body contains the person data
        
        //Create a new Pereson document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/', async(req,res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});

    }
})

//Parameterized API (if we want data of specific parameter stored in schema)
router.get('/:workType', async(req,res) => {
    try{
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType=="chef" || workType=="manager" || workType=="waiter"){
            const response = await Person.find({work:workType});
            console.log('response fetched')
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid work type"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
    
})

//Update record
router.put('/:id', async(req,res) => {
    try{
        const personId = req.params.id; //extract the id from url parameter
        const data = req.body;
        const response = await Person.findByIdAndUpdate(personId, data, {
            new: true, //return the updated document
            runValidators : true, //run mongoose validation
        })
        if(!response){
           res.status(404).json({error:"Person not found"})
        }
        console.log('data updated');
        res.status(200).json(response);
       }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

//delete record
router.delete('/:id', async(req,res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error:"Person not found"})
        }
        console.log('data deleted');
        res.status(200).json({message:"Data deleted successfully"});;
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})

    }
})


module.exports = router;