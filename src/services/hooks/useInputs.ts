import { FormEvent, useEffect, useState } from "react";

interface IData {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
}

interface Iinputs {
  [name: string] : HTMLInputElement
}

export function useInputs(data?: IData) {
  const [values, setValues] = useState<IData>({});
  const [inputs, setInputs] = useState<Iinputs>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (data) {
      setValues(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;

    setValues({ ...values, [name]: value });
    setInputs({ ...inputs, [name]: input });

    setIsValid(() => {
      const form = input.closest("form") as HTMLFormElement
      return form.checkValidity()
    })
  };

  function resetForm() {
    setValues({});
    setIsValid(false)
    setValues(data || {})
  }

  return { values, handleChange, isValid, resetForm };
}
