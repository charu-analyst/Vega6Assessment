import authController from '../controller/authController.js';
import authMiddleware from '../../helpers/auth.js'
const {verifyToken}=authMiddleware;
const { SignUp, userLogin,getProfile,editUserProfile,deleteUserProfile } = authController;

import express from 'express';
const router=express.Router();

router.post("/SignUp",SignUp);
router.post("/userLogin",userLogin);
router.get("/getUserProfile",verifyToken,getProfile);
router.put("/editUserProfile",verifyToken,editUserProfile);
router.put("/deleteUserProfile",verifyToken,deleteUserProfile);

export default router ;