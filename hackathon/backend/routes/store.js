const express=require('express');
const Inventory=require('../modules/Inventory');
const app=express();
const router=express.Router();
const{body,validationResult}=require('express-validator');
const fetchItem=require('../middleware/fetchItem');
const Seller = require('../modules/Seller');
const upload=require('../middleware/multer');

router.get('/inventory/getinventory', fetchItem, async (req, res) => {
    try {
        // Ensure req.seller.id is correct
        const sellerId = req.seller.id;

        // Find inventory items where the seller field matches the seller's ID
        const inventory = await Inventory.find({ seller: sellerId });

        // Check if any inventory items were found
        if (!inventory || inventory.length === 0) {
            return res.status(404).send("Inventory not found");
        }

        // Return the found inventory items
        res.status(200).json(inventory);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


//for adding a inventory
router.post('/inventory/add',fetchItem,[
    body("name","min length of the name is 3").isLength({min:3}),
    body("quantity","cant left this field empty").exists(),
    body("price","cant left this field empty").exists(),
    body("itemcode","cant left this field empty").exists(),
    body("tag","min length of the name is 3").isLength({min:3}),
    body("image","cant left this field empty").exists(),
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json({error:error.array()});
    }
    try {
        const {name,quantity,price,itemcode,tag,image}=req.body;
        const inventory=await new Inventory({
            name,quantity,price,itemcode,tag,image,seller:req.seller.id
        })
        const saveInventory=await inventory.save()
        res.status(200).send(saveInventory);
    } catch (error) {
        res.status(500).json({error:error});
    }
})

//for updating an inventory
router.put('/inventory/update/:id',upload.single('image'),fetchItem,[
    body("name","min length of the name is 3").isLength({min:3}),
    body("quantity","cant left this field empty").exists(),
    body("price","cant left this field empty").exists(),
    body("itemcode","cant left this field empty").exists(),
    body("tag","min length of the name is 3").isLength({min:3}),
    body("image","cant left this field empty").exists(),
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        res.status(401).json({error:error.array()});
    }
    try {
        const productId=req.params.id;

        const {name,quantity,price,itemcode,tag}=req.body;

        let image;
        if(req.file){
            image=req.file.path
        }

        const updateProduct=await Inventory.findByIdAndUpdate(productId,{
            name:name,
            price:price,
            image:image || req.body.image,
            itemcode:itemcode,
            tag:tag,
            quantity:quantity
        })

        if(!updateProduct){
            res.status(404).json({error:"product not found"})
        }

        res.status(201).send(updateProduct);
    } catch (error) {
        res.status(500).json({error:error});
    }
})

//delete the item
router.delete('/inventory/delete/:id',fetchItem,async(req,res)=>{
    try {
        
        const productId=req.params.id;
    
        const deletedProduct=await Inventory.findByIdAndDelete(productId);
        
        if(!deletedProduct){
            res.status(404).json({error:"Inventory not found"});
        }
        res.send(200).send("inventory deleted sucessfully");

    } catch (error) {
        res.status(500).json({error:error});
    }

})

//for seaching the item
router.get('/inventory/search',fetchItem,async (req,res)=>{
    try {
        const{name,minPrice,maxPrice,tag}=req.query;

        const query={};
        if(name){
            query.name={$regex:name,$options:'i'};
        }
        if(minPrice){
            query.price={$gte:minPrice};
        }
        if(maxPrice){
            query.price={...query.price,$lte:maxPrice};
        }
        if(tag){
            query.tag=tag;
        }

        const inventoryItem=await Inventory.find(query);
        res.status(200).json(inventoryItem)
    } catch (error) {
        res.status(500).json({error:error});
    }
})

// adding pagination
router.get('/inventory',fetchItem,async(req,res)=>{

    try {
        
        const page=parseInt(req.query.page,10)||1;
        const limit=parseInt(req.query.limit,10)||10;
        const offset=(page-1)*limit;
    
        const inventory=await Inventory.find()
        .skip(offset)
        .limit(limit)
        .exec();
        
        if(!inventory){
            res.status(404).send("Iventory not found");
        }

        const totalCount=await Inventory.countDocuments();
    
        const totalPages=Math.ceil(totalCount/limit);
    
        res.status(200).json({
            currentPage:page,
            pageSize:limit,
            totalPages:totalPages,
            totalCount:totalCount,
            data:inventory
        })
    } catch (error) {
        res.status(500).json({error:error});
    }
})

//adding a accounting system:
router.get('/inventory/analytics',fetchItem,async(req,res)=>{
    try {
        const countingNoOfItems=await Inventory.countDocuments();
        const totalPrices=await Inventory.aggregate([
            {
                $group:{
                    _id:null,
                    total:{$sum:"$price"},
                    average:{$avg:"$price"}
                }
            }
        ]);

        const analyticsReport={
            count:countingNoOfItems,
            totalPrice:totalPrices.length>0?totalPrices[0].total:0,
            averagePrice:totalPrices.length>0?totalPrices[0].average:0
        } 

        res.status(200).json(analyticsReport);
    } catch (error) {
        res.status(500).json({error:error});
    }
})


module.exports=router;