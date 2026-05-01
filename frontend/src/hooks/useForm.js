import { useState } from 'react';

function useForm({ initialValues }) {
  const [form, setForm] = useState({
    initialValues,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // Tracks whether user has interracted with an input field

  function validateField(fieldName, enteredValue, form) {
    if (fieldName === 'name') {
      if (!enteredValue.trim()) return 'Name is required';
    }

    if (fieldName === 'email') {
      if (!enteredValue) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(enteredValue)) return 'Invalid email';
    }

    if (fieldName === 'password') {
      if (!enteredValue) return 'Password is required';
      if (enteredValue.length < 6) return 'Password too short';
    }

    if (fieldName === 'confirm') {
      if (!enteredValue) return 'Confirm your password';
      if (enteredValue !== form.password) return 'Passwords do not match';
    }

    return '';
  }

  function handleBlur(e) {
    console.log(e.target);
    const { id: fieldName, value: enteredValue } = e.target; // name = name of the input the user is working on eg email, password

    // mark the input field as touched
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    // validate only this field
    setErrors((prev) => ({
      ...prev,

      [fieldName]: validateField(fieldName, enteredValue, form),
    }));
  }

  function handleChange(e) {
    const { id, value } = e.target;

    setForm((form) => ({ ...form, [id]: value }));
  }

  function handleIconToggle(e, fieldObj, str) {
    e.preventDefault();
    setShowPassword((showPassword) => ({
      ...showPassword,
      [fieldObj ? fieldObj.id : str]:
        !showPassword[fieldObj ? fieldObj.id : str],
    }));
  }

  return {
    form,
    showPassword,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleIconToggle,
  };
}

export default useForm;
