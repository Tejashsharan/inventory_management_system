const express=require('express');
const router=express.Router();
const Transaction=require('../modules/Transacation');
const {body,validationResult}=require('express-validator')
const fetch=require('../middleware/fetchItem')

//making api for fetching the transaction history
router.get('/transaction/history',fetch,async(req,res)=>{
    try {
        
        const trans = await Transaction.find({seller:req.seller.id});
        if(!trans){
            res.status(404).send("Inventory not found");
        }
        res.status(200).json(trans);

    } catch (error) {
        res.status(500).json({error:error});
    }
})

//making api for adding tranction
router.post('/transaction/add',fetch
,[
    body("type","Enter the type of transaction you want to record").exists(),
    body("product","Enter the product whose transaction you want to record").isArray().notEmpty(),
    body("amount","Enter the amount you want to enter").isNumeric()
],async(req,res)=>{

    const error=validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json({error:error.array()});
    }
    
    try {
        const {type,product,amount,seller}=req.body;
    
        const trans=new Transaction({
            type:type,
            products:product,
            amount:amount,
            seller:req.seller.id
        })
    
        const newtrans=await trans.save();
        res.status(200).json(newtrans);

    } catch (error) {
        res.status(500).json({error:error});
    }

})

//for updating the transaction history
router.put('/transaction/update/:id',fetch,[
    body("type","Enter the type of transaction you want to record").exists(),
    body("product","Enter the product whose transaction you want to record").isArray().notEmpty(),
    body("amount","Enter the amount you want to enter").isNumeric()
],async(req,res)=>{

    const error=validationResult(req);
    if(!error.isEmpty())
    res.status(400).json({error:error});

    try {
        
        const {type,product,amount}=req.body;
        const uptrans={};
    
        if(type){
            uptrans.type=type;
        }
        if(product){
            uptrans.product=product;
        }
        if(amount){
            uptrans.amount=amount;
        }
    
        const change=await Transaction.findByIdAndUpdate(req.params.id,uptrans);
    
        if(!change){
            res.status(404).send("Transaction not found");
        }
        res.status(200).json(change);

    } catch (error) {
        res.status(500).json({error:error})
    }

})

module.exports=router;