import { useState } from "react";

export function useInputs() {
  const [values, setValues] = useState({});
  const [inputs, setInputs] = useState({});
  const [icons, setsIcon] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState();


  const handleChange = (event) => {
    const input = event.target;
    const name = input.name;
    const value = input.value;

    setValues({ ...values, [name]: value });
    setInputs({ ...inputs, [name]: input });

    setIsValid(() => {
      const form = input.closest("form");
      return form.checkValidity()
    })
  };

  function resetForm() {
    setValues({});
    setTimeout(() => {
      Object.values(inputs).forEach(input => input.value = '')
    }, 100)
  }

  return { values, handleChange, isValid, resetForm };
}
