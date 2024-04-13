const express=require('express');
const Inventory=require('../modules/Inventory');
const app=express();
const router=express.Router();
const{body,validationResult}=require('express-validator');
const fetchItem=require('../middleware/fetchItem');
const Seller = require('../modules/Seller');

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
router.put('/inventory/update/:id',fetchItem,[
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

        const {name,quantity,price,itemcode,tag,image}=req.body;

        const updateProduct=await Inventory.findByIdAndUpdate(productId,{
            name:name,
            price:price,
            image:image,
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
//api to add the inventory 
//api to update the inventory
//api to delete the inventory
module.exports=router;