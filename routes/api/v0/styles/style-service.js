import Style from "../../../../models/style";

export const saveStyle = async (data) => {
  return await Style.create({
    Description: data.description,
    styleName: data.styleName,
  });
};

export const getAllStyles = async () => {
  return await Style.findAll();
};

export const getStyleById = async (id) => {
  return await Style.findOne({ where: { styleId: id } });
};
