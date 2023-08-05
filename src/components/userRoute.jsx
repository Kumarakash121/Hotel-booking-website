// const mongoose=require('mongoose');
// const express=require('express');
// const router=express.router();
// const UserSchema=mongoose.schema({


//     name:{
//       type:"String",
//       required:true
//     },
//     email:{
//         type:"String",
//         required:true
//     }
//     ,password:{
//         type:"String",
//         required:true
//     },
//     isAdmin:{
//         type:"String",
//         default:false
//     },
    
// },{
//     timeStamps:true,
// })

// const userModel=mongoose.model("users",UserSchema);

// router.post('/register', async (req, res) => {
//     try {
//       const { name,email, password,cpassword } = req.body;
//       const newUser = new User({ name,email, password,cpassword });
//       await newUser.save();
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error registering user' });
//     }
//   });

// //   router.post('/login', async (req, res) => {
// //     try {
// //       const { email, password } = req.body;
// //       const user = await User.findOne({ email, password });
// //       if (user) {
// //         res.status(200).json({ message: 'Login successful' });
// //       } else {
// //         res.status(401).json({ error: 'Invalid credentials' });
// //       }
// //     } catch (error) {
// //       res.status(500).json({ error: 'Error logging in' });
// //     }
// //   });