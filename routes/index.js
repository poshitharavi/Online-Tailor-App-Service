import apiRoutes from "./api";

export default (app) => {
  app.use("/tailoring-app/api", apiRoutes);
};
