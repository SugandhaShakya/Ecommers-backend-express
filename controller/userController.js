const User = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
  const user = await User.find().select('-passwordHash')
  if (!user) {
    res.status(500).json({ sucess: false });
  }
  res.status(200).send(user);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');

  if (!user) {
    res
      .status(500)
      .json({ message: "The User with the given ID was not found." });
  }
  res.status(200).send(user);
};

const registerUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  user = await user.save();

  if (!user) return res.status(400).send("ther user cannot be created!!");

  res.send(user);
};

const loginUser = async (req, res)=>{
  const user = await User.findOne({email: req.body.email})

  if(!user){
    return res.status(400).send('the user not found')
  }
  if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
        email: user.email

      },
      process.env.JWT_SECRET,{
        expiresIn:'30d'
      }
    )
    res.status(200).send({user: user.email, token})
  }else{
    res.status(400).send('password is wrong');
  }
}


module.exports = {
  getUser,
  registerUser,
  getUserById,
  loginUser,
};
