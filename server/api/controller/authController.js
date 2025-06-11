import userServices from "../services/userServices.js";
import responseMessages from "../../../assets/responseMessages.js";
import statusCode from "../../../assets/responseCode.js";
import commonFunction from "../../helpers/utils.js";
import bcrypt from "bcrypt";

const {
  createUser,
  findUser,
  findUserData,
  updateUser,
  deleteUser,
  countTotalUser,
} = userServices;
import Joi from "joi";


const SignUp = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
    image: Joi.string().required(),
  });
  try {
    const validatedBody = await schema.validateAsync(req.body);
    let { email, password, image } = validatedBody;
    validatedBody.password = bcrypt.hashSync(validatedBody.password, 10);

    const isUserExist = await findUser({ email: email });
    if (isUserExist) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode.Conflict,
        responseMessage: responseMessages.ALREADY_USER_EXIST,
      });
    }
    const url = await commonFunction.getSecureUrl(image);
    validatedBody.image = url;

    const result = await createUser(validatedBody);
    return res.status(statusCode.OK).send({
      statusCode: statusCode.Created,
      responseMessage: responseMessages.USER_CREATED,
      result: result,
    });
  } catch (error) {
    console.log("error while", error);
    return next(error);
  }
};

const userLogin = async (req, res, next) => {
  const fields = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
    .required(),
  });
  try {
    const validate = await fields.validateAsync(req.body);
    const isUserExist = await findUser({ email: validate.email });
    if (!isUserExist) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.USER_NOT_FOUND,
      });
    }
    const compare = bcrypt.compareSync(validate.password, isUserExist.password);
    if (compare == false) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode.BadRequest,
        responseMessage: responseMessages.INCORRECT_PASSWORD,
      });
    }
    const token = await commonFunction.getToken({ _id: isUserExist._id });
    return res.status(statusCode.OK).send({
      statusCode: statusCode.OK,
      responseMessage: responseMessages.LOGIN_SUCCESS,
      result: { token, isUserExist },
    });
  } catch (error) {
    return next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const isUserExist = await findUser({ _id: req.userId });
    if (!isUserExist) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.USER_NOT_FOUND,
      });
    }
    return res.status(statusCode.OK).send({
      statusCode: statusCode.OK,
      responseMessage: responseMessages.LOGIN_SUCCESS,
      result: isUserExist,
    });
  } catch (error) {
    return next(error);
  }
};

const editUserProfile = async (req, res, next) => {
  let schema = Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    image: Joi.string().optional(),
  });
  try {
    const validatedBody = await schema.validateAsync(req.body);
    let { email, profileImage, password } = validatedBody;
    const isUserExist = await findUser({ _id: req.userId });
    if (email) {
      if (email === isUserExist.email) {
      } else {
        const isEmailAlreadyExist = await findUser({
          email: validatedBody.email,
          _id: { $ne: req.userId },
        });

        if (isEmailAlreadyExist) {
          return res.status(statusCode.OK).json({
            statusCode: statusCode.Conflict,
            message: responseMessages.EMAIL_EXIST,
          });
        }
      }
    }
    if (password) {
      validatedBody.password = bcrypt.hashSync(validatedBody.password, 10);
    }
    if (profileImage) {
      const url = await commonFunction.getSecureUrl(profileImage);
      validatedBody.image = url;
    }
    const updateUserDetails = await updateUser({_id:isUserExist._id},validatedBody);
    return res.status(statusCode.OK).send({
      statusCode: statusCode.OK,
      responseMessage: responseMessages.UPDATE_SUCCESS,
      result: updateUserDetails,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUserProfile = async (req, res, next) => {
  try {
    const isUserExist = await findUser({ _id: req.userId });
    if (!isUserExist) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.USER_NOT_FOUND,
      });
    }
    await updateUser({_id:isUserExist._id},{ status: "DELETE" });
    return res.status(statusCode.OK).send({
      statusCode: statusCode.NotFound,
      responseMessage: responseMessages.DELETE_SUCCESS,
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  SignUp,
  userLogin,
  getProfile,
  editUserProfile,
  deleteUserProfile,
};
