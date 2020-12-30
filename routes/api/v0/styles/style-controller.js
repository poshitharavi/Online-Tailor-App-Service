import to from "await-to-js";
import { saveStyle, getAllStyles, getStyleById } from "./style-service";

export const saveStyleController = async (req, res) => {
  const { body } = req;

  const [err, style] = await to(saveStyle(body));

  if (!err) {
    return res.json(style);
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getAllStylesController = async (req, res) => {
  const [err, styles] = await to(getAllStyles());

  if (!err) {
    return res.json(styles);
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getStyleByIdController = async (req, res) => {
  const { id } = req.params;
  const [err, style] = await to(getStyleById(id));

  if (!err) {
    if (style) res.json(style);

    return res.status(200).json({
      status: 2,
      error: "Style not found",
    });
  }

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};
