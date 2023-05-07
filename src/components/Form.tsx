import React, { FC, useEffect, useState } from 'react';
import axios from 'axios'
import IUser from '../type/Types';
export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ipAddress: string;
}

type FormProps = {
  postUser: (values: FormValues) => void;
  editUser: (id: number, values: FormValues) => void;
  defaultUser?: IUser;
}
const value = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  ipAddress: "",
}
const Form: FC<FormProps> = ({ postUser, defaultUser, editUser }) => {
  const [values, setValues] = useState<FormValues>(defaultUser ? defaultUser : value);

  useEffect(() => {
    if (defaultUser) {
      setValues(defaultUser)
    }
  }, [defaultUser])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (defaultUser) {
      editUser(defaultUser.id, values)
      clearForm();
    } else {
      postUser(values)
      clearForm();
    }
  };
  const clearForm = () => {
    setValues(value);
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" onChange={handleChange} required value={values.gender}>
        <option value=""></option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label htmlFor="ipAddress">IP Address:</label>
      <input
        type="text"
        id="ipAddress"
        name="ipAddress"
        value={values.ipAddress}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>

  )
}

export default Form
