const mongoose = require("mongoose");

const schema=mongoose.Schema

const schemaClass= new schema({
    name:{
        type: String,
        required:true,
    },
    capacity:{
        type: Number,
        required:true,
    },
    startTime: {
		type: Date,
		default: Date.now,
	},
    userList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    waitList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]

}
);
module.exports= Class = mongoose.model('class',schemaClass);
// module.exports = Class = mongoose.model('Class', ClassSchema);