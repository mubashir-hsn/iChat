import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt_tokken/createTokken.js"

export const signUp = async (req, res) => {
    const { fullName, email,gender, password, confirmPassword,about } = req.body;
    try {
      // Password validation
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password and confirm password should match." });
      }

      // Check if user already exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists." });
      }
  
      // Hash the password
      const hashPassword = await bcrypt.hash(password, 12);
  
      // Create new user
      const newUser = await new User({
        fullName,
        email,
        gender,
        password: hashPassword,
        about,
      });
  
      await newUser.save();
  
      // Create token and save cookie
      if (newUser) {
        createTokenAndSaveCookie(newUser._id, res);
        res.status(201).json({
          message: "User created successfully.",
          user: {
            _id: newUser._id,
            fullName: newUser.fullName,  // Ensure field name consistency
            email: newUser.email,
            gender: newUser.gender,
            about: newUser.about,
          },
        });
      }
    } catch (error) {
      console.log("Error: " + error.message);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Compare the password only if the user exists
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Create a token and save it as a cookie
      createTokenAndSaveCookie(user._id, res);
  
      // Send success response
      return res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          fullName: user.fullName,  // Consistent field name
          email: user.email,
          gender: user.gender,
          about: user.about,
        },
      });
    } catch (error) {
      console.log("Error: " + error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const logout = async (req, res) => {
    try {
      // Clear the cookie containing the JWT token
      res.clearCookie('jwt');
  
      // Send success response
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log("Error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const getAllUsers = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');
      res.status(200).json(allUsers);
    } catch (error) {
      console.log("Error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    try {
      if(oldPassword===newPassword){
        return res.status(401).json({ message: "New password cannot be old password." });
      }
      const user = await User.findById(req.user._id); // Assuming req.user._id contains the logged-in user's ID
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Old password does not match" });
      }
  
      // Hash the new password before saving
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.log("Error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const updateUserProfile = async(req, res) => {
    try {
        const { fullName, email, about } = req.body;
        const userId = req.user.id; // Extract user ID from JWT

        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, email, about },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send a single object with both message and user data
        res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
