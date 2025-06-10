import jwt from "jsonwebtoken";
import statusCode from "../../assets/responseCode.js";
import responseMessages from "../../assets/responseMessages.js";
import  userServices  from "../api/services/userServices.js";
const { findUser } = userServices;
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
export default  {
  async verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode,
        responseMessage: responseMessages.NO_TOKEN,
      });
    }
    try {
      jwt.verify(token, jwtSecret, async (err, result) => {
        if (err) {
          if (err.name == "TokenExpiredError") {
            return res.status(statusCode.OK).send({
              statusCode: statusCode.BadRequest,
              responseMessage: responseMessages.TOKEN_EXPIRED,
            });
          } else {
            return res.status(statusCode.OK).send({
              statusCode: statusCode.BadRequest,
              responseMessage: responseMessages.UNAUTHORISED,
            });
          }
        } else {
          const userResult = await findUser({ _id: result._id });
          if (!userResult) {
            return res.status(statusCode.OK).send({
              statusCode: statusCode.NotFound,
              responseMessage: responseMessages.USER_NOT_FOUND,
            });
          }else{
            req.userId=userResult._id;
            return next();
          }
        }
      });
    } catch (error) {
        console.log("Error",error);
        return next(error)
    }
  },
};
