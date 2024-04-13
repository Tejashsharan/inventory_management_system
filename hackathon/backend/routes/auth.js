const express=require('express');
const Seller=require('../modules/Seller');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchItem=require('../middleware/fetchItem');

const jwt_secret='shhthis!sp@ssword';
//signup
const router=express.Router();
router.post('/seller/signup',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','min lenght of password is 5').isLength({min:5})
],async(req,res)=>{

    //check if the validation conditions are satisfied
    const result=validationResult(req);
    if(!result.isEmpty()){
        res.status(400).json({error:error.array()});
    }

    //check if the user exists 
    try {
        const seller=await Seller.findOne({email:req.body.email})
        if(seller){
            res.status(400).json({error:"A email with this userid exists."});
        }

        //saving data to the database
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);

        const newSeller=await Seller.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })

        res.status(201).json({message:"user created successfully",user:newSeller})

    } catch (error) {
        res.status(500).json({error:error});
    }

})

// login
router.post('/seller/login',[
    body("email","Enter a valid email").isEmail(),
    body("password","Enter a valid password").exists()
],async(req,res)=>{

    //see if all the validation conditions are satisfied or not
    const result=validationResult(req);
    if(!result.isEmpty()){
        res.status(400).json({error:error.array()});
    }

    //checking if the user exists
    const {email,password}=req.body;
    try {
        
        const seller=await Seller.findOne({email});
        if(!seller){
            res.status(401).json({error:"invalid credentials"});
        }
    
        //checking password
        const checkPass=await bcrypt.compare(password,seller.password);
        if(!checkPass){
            res.status(401).json({error:"invalid credentials"});
        }
    
        //generating auth token
        const data={
            seller:{
                id:seller.id
            }
        }
        const authToken=jwt.sign(data,jwt_secret)
        res.status(201).json({authtoken:authToken})
    } catch (error) {
        res.status(500).json({error:error});   
    }

})

router.post('/seller/getseller',fetchItem,async(req,res)=>{
    try {
        
        const sellerId=req.seller.id;
        const seller=await Seller.findById(sellerId);
        res.send(seller);
    } catch (error) {
        res.status(401).send("Internal error occureed ")
    }
})

module.exports=router;


