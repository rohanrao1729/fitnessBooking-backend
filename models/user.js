const mongoose=require("mongoose")

const schema=mongoose.Schema

const schemaUser=new schema({
    email:{
        type: String,
        required: true,
    },
    bookedSlots:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'class',
        }
    ],
    waitListedSlots:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'class',
        }

    ]
})
module.exports=user=mongoose.model('user',schemaUser)