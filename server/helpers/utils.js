import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtsecret = process.env.JWT_SECRET;
import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const commonFunction = {
  getToken: async (payload) => {
    try {
      const token = jwt.sign(payload,jwtsecret , {
        expiresIn: "24h",
      });
      
      return token;
    } catch (error) {
      return error;
    }
  },
  getSecureUrl: async (base64,folderName) => {
    try {
      const data = await cloudinary.v2.uploader.upload(base64,{folder: folderName});
      return data.secure_url;
    } catch (error) {
      return error;
    }
  },
};

export default commonFunction;