var bcrypt = require("bcrypt");
//so salty
var salt = bcrypt.genSaltSync(10);
//add passport stuff
var passport = require('passort');
var passportLocal = require('passport-local');

module.exports = function (sequelize, DataTypes){
   var User = sequelize.define('user', {
     username: { 
        type: DataTypes.STRING, 
        //all usernames must be unique
        unique: true, 
        validate: {
          //length parameters
          len: [6, 30],
          }
    },
    password: {
        type:DataTypes.STRING,
        validate: {
          //cannot leave password empty
          notEmpty: true
          //not sure if this is okay, but could help validate
          //length parameter set in newUer ?
          len:[6, 30],
        }
      }
    },
    
    {
      classMethods: {
        associate: function(db){
          User.hasMany(db.post);
      },
      encryptPassword: function(password) {
        var hashPass = bcrypt.hashSync(password, salt);
        return hashPass;
      },
      comparePassword: function()
      //shaky on this part 
      },
      newUser: function(username, password, err, success){
        if(password.length < 8) {
          err({message: "Your password needs at least 8 characters"});
        //these messages are objects, need to clarify why
        } 
        else({
          user.create({
            username: username.
            password: User.encryptPassword(password)
          }).error(function(error){
            //so we can know what the error is
            console.log(error);
            if(error.username){
              err({message:"Username's must be at leat 6 characters"});
            }
            else{
              err({message:"That username already exists, be more creative"});
            }
          }).success(function(user){
            success({message: "You are now a user, we can't wait for you to login"})
          });
          //would like to see this entire function in one
          //line without any of the contents just to see
          //how its tiered
        });
      }
    } //close classMethods outer 
  ); // close define user
  return User;
}; // close User function

