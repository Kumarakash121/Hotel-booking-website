const mongoose=require("mongoose");



mongoose.connect("mongodb+srv://20001011004:Test123@cluster0.lvz6ymg.mongodb.net/mern-rooms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var connection=mongoose.connection


connection.on('error',function(){
    console.log("failed");
})
connection.on('connected',function(){
    console.log("connected");
})


module.exports=mongoose;