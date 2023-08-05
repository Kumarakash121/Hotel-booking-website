const express=require("express");
const bodyparser = require('body-parser')
const cors = require('cors');
const app=express();
const bcrypt = require('bcrypt');
const path=require('path');
// import moment from "moment";
// const cors = require('cors');
// const usersRoute=require("./src/components/userRoute");
app.use('/public', express.static('public'));
app.use(express.static,path.join(__dirname+'./build'));
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./build/index.html'));
})
const mongoose=require("mongoose");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(bodyparser.json())
// app.use("/api/users",usersRoute);
mongoose.connect("mongodb+srv://20001011004:Test123@cluster0.lvz6ymg.mongodb.net/mern-rooms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



var connection=mongoose.connection
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

connection.on('error',function(){
    console.log("failed");
})
connection.on('connected',function(){
    console.log("connected");
})

// app.get("/api/rooms/getallrooms",function(req,res){
 
// })


const UserSchema=mongoose.Schema({


  name:{
    type:"String",
    required:true
  },
  email:{
      type:"String",
      required:true
  }
  ,password:{
      type:"String",
      required:true
  },
  cpassword:{
    type:"String",
    required:true
  }
  ,
  isAdmin:{
      type:"String",
      default:false
  },
  
},{
  timeStamps:true,
})

const User=mongoose.model("User",UserSchema);

const roomSchema=mongoose.Schema({
    
    name:{
       type:String,
       required:true
    }
    ,
    maxCount:{
       type:Number,
       required:true
    }
   ,phoneNumber:{
       type:Number,
       required:true
   }
   ,rentPerDay:{
       type:Number,
       required:true
   }
   ,imageUrls:[]
   ,currentBookings:[]
   ,Type:{
       type:String,
       required:true
   }
   ,Description:{
       type:String,
       required:true
   }
})

const rooms=mongoose.model('rooms',roomSchema);

   const bookingSchema=mongoose.Schema({

     room:{
      type:String,
      required:true
     }
     ,
     roomid:{
      type:String,
      required:true
     },
     userid:{
      type:String,
      required:true
     },
     fromdate:{
      type:String,
      required:true
     },
     todate:{
      type:String,
      required:true
     },
     totalamount:{
      type:Number,
      required:true
     },
     totaldays:{
      type:Number,
      required:true
     },
     transactionid:{
      type:String,
      required:true
     },
     status:{
      type:String,
      required:true,
      default:'booked'
     }
   },{
     timeStamps:true,
   })

   const Bookings=mongoose.model('bookings',bookingSchema);



  app.post("/api",async(req,res)=>{
    try{
      const temp=await rooms.find();
      res.send(temp);
     }
     catch(error){
    return res.status(400).json({error});
     }
  });
  app.post('/register', async (req, res) => {
    try {
      const { name, email, password, cpassword } = req.body;
  
      // Check if password and cpassword match
      if (password !== cpassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      const newUser = new User({ name, email, password, cpassword });
      await newUser.save();
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error registering' });
    }
  });
    
  app.post('/bookroom', async (req, res) => {
    const {
      room,
      user,
      fromdate,
      todate,
      total,
      totalamount,
    } = req.body;
  
    try {
      const book = new Bookings({
        room: room.data.name,       // Ensure room data is sent properly from the client
        roomid: room.data._id, // Access _id property of room object
        userid: user, // Access _id property of user object
        fromdate: moment(fromdate).format('DD-MM-YYYY'),
        todate: moment(todate).format('DD-MM-YYYY'),
        totaldays: total,
        totalamount: totalamount,
        transactionid: '1234',
      });
   
      const booking=await book.save();
      const roomtemp=await rooms.findOne({_id:room.data._id});
      roomtemp.currentBookings.push({
        bookingid:booking._id,
        fromdate: moment(fromdate).format('DD-MM-YYYY'),
        todate: moment(todate).format('DD-MM-YYYY'),
        userid:user,
        status:booking.status


      });
      await roomtemp.save();
      res.send('Room booked successfully');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Error booking room');
    }
  });
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({email:email,password:password});
        
      // Check if password and cpassword match
       if(!user){
        return res.status(400).json({message:'login failed'});
        
       }
       else{
        const temp={
          name:user.name,
          email:user.email,
          isAdmin:user.isAdmin,
          _id:user._id
        }
        return res.send(temp);
       }
  
      
      
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
   
  });
  app.post('/getroombyid', async (req, res) => {
    console.log(req.body);
    try {
      const roomId = req.body.roomid; // Change to roomId for consistency
      console.log(roomId);
      const room = await rooms.findOne({ _id: roomId });
      console.log("Room-->",room);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      } else {
        return res.send(room);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.post('/getroombyuserid', async (req, res) => {
    console.log(req.body);
    try {
      const Id = req.body.userid; 
      console.log(Id);// Change to roomId for consistency
      const boo=await Bookings.find({userid:Id});
      // res.send(boo);
      res.json(boo);
    } catch (error) {
      console.log(error);
      // return res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.post('/cancel',async(req,res)=>{

    const {bookingid,roomid}=req.body;

    try {
      const bookingitem=await Bookings.findOne({_id:bookingid});
       bookingitem.data.status='Cancelled';
       await bookingitem.save();
       const room=await rooms.findOne({_id:roomid});
       console.log(room);
       const bookings=room.currentBookings;
       const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid);
       room.currentBookings=temp;
       await room.save();
       res.send("booking cancelled successfully");

      
    } catch (error) {
      return res.status(400).json({error});
    }
  })
  
  app.post('/getallbookings',async(req,res)=>{

    try{
     const temp=await Bookings.find();
     res.send(temp);
    }
    catch(error){
   return res.status(400).json({error});
    }
  })



   app.post('/getallusers',async(req,res)=>{
    try{
      
      const temp=await User.find();
      
      res.send(temp);
     }
     catch(error){
    return res.status(400).json({error});
     }
   })


   app.post('/addroom',async(req,res)=>{
    try{
      
      const newtemp=new rooms(req.body);
      
      await newtemp.save();
      res.send("room added ");
     }
     catch(error){
    return res.status(400).json({error});
     }
   })
const PORT = process.env.PORT || 5000;
app.listen(PORT,function(){
    console.log("server started")
});
