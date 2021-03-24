// GET MANY
const getMany = model => async (req, res) => {
  try {
  } catch (err) {}
};

// GET ONE
const getOne = model => async (req, res) => {
  try {
  } catch (err) {}
};

// CREATE ONE
const createOne = model => async (req, res) => {
  try {
  } catch (err) {}
};

// UPDATE ONE
const updateOne = model => async (req, res) => {
  try {
  } catch (err) {}
};

// DELETE ONE
const deleteOne = model => async (req, res) => {
  try {
  } catch (err) {}
};

// export object
export default crudControllers = model => {
  return {
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model)
  };
};
