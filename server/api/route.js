import userRoute from './route/authRoute.js';
import blogRoute from './route/blogRoute.js';
const routes = (app) => {
  app.use("/vega/api/user", userRoute);
   app.use("/vega/api/blog", blogRoute);
};

export default routes;
