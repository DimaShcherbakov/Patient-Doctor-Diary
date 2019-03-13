import uuid from "uuid/v4";

export const addRow = formData =>({
  type: "ADD_ROW",
  formData,
  id: uuid(),
})

export const removeRow = id =>({
  type: "DELETE_ROW",
  id,
})