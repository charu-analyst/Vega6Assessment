import blogServices from "../services/blogServices.js";
import responseMessages from "../../../assets/responseMessages.js";
import statusCode from "../../../assets/responseCode.js";
import commonFunction from "../../helpers/utils.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import userServices from "../services/userServices.js";
const {
  createblog,
  findblog,
  findblogData,
  updateblog,
  deleteblog,
  countTotalblog,
} = blogServices;
const {
  createUser,
  findUser,
  findUserData,
  updateUser,
  deleteUser,
  countTotalUser,
} = userServices;

// Create (Create Blogs)
const createBlog = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    blogImage: Joi.string().required(),
  });
  try {
    const validatedBody = await schema.validateAsync(req.body);
    const { title, description, blogImage } = validatedBody;
    const isUserExist = await findUser({ _id: req.userId, status: "ACTIVE" });
    if (!isUserExist) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.USER_NOT_FOUND,
      });
    }
    const url = await commonFunction.getSecureUrl(blogImage);

    const result = await createblog({
      title,
      description,
      blogImage: url,
      userId: isUserExist._id,
    });
    return res.status(statusCode.OK).send({
      statusCode: statusCode.Created,
      responseMessage: responseMessages.BLOG_CREATED,
      result: result,
    });
  } catch (error) {
    console.log("error while create blog", error);
    return next(error);
  }
};

// Read (List Blogs)
const getBlogList = async (req, res, next) => {
  try {
    const blogs = await findblogData({ status: "ACTIVE" });
    res.status(statusCode.OK).json({
      statusCode: statusCode.OK,
      responseMessage: responseMessages.BLOG_FOUND,
      result: blogs,
    });
  } catch (err) {
    next(err);
  }
};

// Read (Full Blog)
const getBlogById = async (req, res, next) => {
  try {
    const isBlogExist = await findblog({
      _id: req.query.blogId,
      status: "ACTIVE",
    });
    if (!isBlogExist)
      return res.status(statusCode.OK).json({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.BLOG_NOT_FOUND,
      });
    res.status(statusCode.OK).json({
      statusCode: statusCode.OK,
      responseMessage: responseMessages.BLOG_FOUND,
      result: isBlogExist,
    });
  } catch (err) {
    next(err);
  }
};

//Edit (Edit Blog)
const editBlog = async (req, res, next) => {
  let schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    blogImage: Joi.string().optional(),
    blogId: Joi.string().required(),
  });
  try {
    const validatedBody = await schema.validateAsync(req.body);
    let { title, description, blogImage, blogId } = validatedBody;
    const isUserExist = await findUser({ _id: req.userId });
    if (!isUserExist) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.USER_NOT_FOUND,
      });
    }
    const isBlogExist = await findblog({ _id: blogId, status: "ACTIVE" });
    if (!isBlogExist) {
      return res.status(statusCode.OK).json({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.BLOG_NOT_FOUND,
      });
    }
    if (isBlogExist.userId.toString() !== req.userId.toString()) {
  return res.status(statusCode.OK).json({
    statusCode: statusCode.Forbidden,
    responseMessage: responseMessages.UNAUTHORISED_BLOG,
  });
}
    if (blogImage) {
      const url = await commonFunction.getSecureUrl(blogImage);
      validatedBody.blogImage = url;
    }
    const updateData = await updateblog(
      { _id: isBlogExist._id },
      validatedBody
    );
    res.status(statusCode.OK).json({
      statusCode: statusCode.OK,
      responseMessage: responseMessages.BLOG_UPDATE,
      result: updateData,
    });
  } catch (error) {
    return next(error);
  }
};
// Delete (Remove Blog)
const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.query;

    const isUserExist = await findUser({ _id: req.userId });
    if (!isUserExist) {
      return res.status(statusCode.OK).send({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.USER_NOT_FOUND,
      });
    }
    const isBlogExist = await findblog({ _id: blogId,status: "ACTIVE" });
    if (!isBlogExist) {
      return res.status(statusCode.OK).json({
        statusCode: statusCode.NotFound,
        responseMessage: responseMessages.BLOG_NOT_FOUND,
      });
    }
if (isBlogExist.userId.toString() !== req.userId.toString()) {
  return res.status(statusCode.OK).json({
    statusCode: statusCode.Forbidden,
    responseMessage: responseMessages.UNAUTHORISED_BLOG,
  });
}

    await updateblog({ _id: isBlogExist._id }, { status: "DELETE" });
    res.status(statusCode.OK).json({
      statusCode: statusCode.OK,
      responseMessage: responseMessages.DELETE_SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};


export default {
  createBlog,
  getBlogList,
  getBlogById,
  editBlog,
  deleteBlog,
};
