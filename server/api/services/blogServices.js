import blogModel from '../models/blogModel.js';


const blogServices={
    createblog: async (insertObj) => {
        return await blogModel.create(insertObj);
    },

    findblog: async (query) => {
        return await blogModel.findOne(query);
    },

    findblogData: async (query) => {
        return await blogModel.find(query);
    },

    deleteblog: async (query) => {
        return await blogModel.deleteOne(query);
    },

   
    updateblog: async (query, updateObj) => {
        return await blogModel.findOneAndUpdate(query, updateObj, { new: true });
    },

     countTotalblog: async (body) => {
        return await blogModel.countDocuments(body);
    }    
}

export default blogServices