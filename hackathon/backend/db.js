const mongoose=require('mongoose');
main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/')
    .then(()=>console.log("connected"))
    .catch((e)=>console.log(e.message))
}

module.exports=main;