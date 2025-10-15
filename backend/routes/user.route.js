import express from "express"
import { signUp,login, logout, getAllUsers, changePassword, updateUserProfile } from "../controller/user.controller.js"
import secureRoute from "../middleware/secureRoute.js"
const router = express.Router()
 
router.post('/signup',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.get('/allusers',secureRoute,getAllUsers)
router.post('/change-password',secureRoute,changePassword)
router.put('/update-profile',secureRoute,updateUserProfile)

export default router