const user=require('../models/user');
const Class= require('../models/class');
const { eventNames } = require('../models/user');

exports.createClass= async (req,res)=>{
    try{
        console.log("hero")
        await Class.create(req.body)
        console.log("err")
        return res.status(200).send({
            message :"success"
        })
    }
    catch(err){
        return res.status(400).send({
            message:"failure"
        })
    }
}

exports.bookSlot =async(req,res)=>{
        try{
        console.log("hello")
        let usr = await user.findOne({ email: req.body.email });
       
		// Create User if it doesn't exist
		if (!usr) {
			usr = await user.create({ email: req.body.email });
		}
        console.log(usr.email)
        console.log(req.params.classid)
		let event = await Class.findOne({ name: req.params.classid });

		if (!event) {
			return res.status(400).send({
				message: 'No event found. Check if event exists!',
			});
		}

		if (event.userList.length < event.capacity) {
			event.userList.push(usr.id);
			usr.bookedSlots.push(event.id);

			event.save();
			usr.save();

			return res.status(200).send({
				message: 'Successfully Booked Slot!',
			});
		} else {
			event.waitList.push(usr.id);
			usr.waitListedSlots.push(event.id);

			event.save();
			usr.save();

			return res.status(200).send({
				message: 'Currently Wait listed!',
			});
		}
        }catch(err){
            return res.status(400).send({
                message:"failure"
            })
        }
}
exports.cancelSlot=async(req,res)=>{
    try{
        console.log("hello-cancel")
        let usr = await user.findOne({ email: req.body.email });
        console.log(usr.email)
		if (!usr) {
			return res.status(400).send({
				message: 'No user found!',
			});
		}

		let event = await Class.findOne({ name: req.params.classid });

		if (!event) {
			return res.status(400).send({
				message: 'No event found. Check if event exists!',
			});
		}
        // console.log(Date.now().getTime);
        if((event.startTime.getTime-30*60)<=Date.now().getTime){
            res.status(200).send({
                message:"unable to cancel time more tha 30 mins"
            })
        }
		await user.findOneAndUpdate(
			{ email: req.body.email },
			{ $pull: { bookedSlots: event.id } }
		);
		await Class.findOneAndUpdate(
			{ name : req.params.classid },
			{ $pull: { userList: usr.id } }
		);

		if (event.waitList.length > 0) {
			let topEvent = event.waitList[0];
			await Class.findOneAndUpdate(
				{ name : req.params.classid },
				{
					$push: { userList: topEvent },
					$pull: { waitList: topEvent },
				}
			);
		}

		return res.status(200).send({
			message: 'Success!',
		});

    }catch(err){
        return res.status(400).send({
            message:"failure"
        })
    }
}

exports.listUsers=async(req,res)=>{
    try{
        console.log("trying to get all users")
        let listOfUsers=await user.find();
        
        // let objson=JSON.parse(listOfUsers)
        // console.log(objson)
    res.status(200).send({
        message:listOfUsers
    })
    }catch(err){
        res.status(400).send({
            message:"failure unable to fetch users"
        })
    }
}

exports.getUserClasses=async(req,res)=>{
    try{
        let usr=await user.findOne({email: req.params.userid});
    // let objson=JSON.parse(usr.bookedSlots)
        console.log(req.params.userid)
        console.log(usr)
    res.status(200).send({
        message:usr.bookedSlots
    })
    }catch(err){
        res.status(400).send({
            message:"failure unable to fetch users"
        })
    }

}