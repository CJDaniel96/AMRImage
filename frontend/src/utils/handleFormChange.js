// src/utils/handleFormChange.js

export const handleFormChange = (setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
