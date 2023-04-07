<template>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="values.username" name="username" />
        <ErrorMessage name="username" />
      </div>
  
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="values.email" name="email" />
        <ErrorMessage name="email" />
      </div>
  
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="values.password" name="password" />
        <ErrorMessage name="password" />
      </div>
  
      <button type="submit">Submit</button>
    </form>
  </template>
  
  
<script>


/* eslint-disable */



import { defineRule, ErrorMessage, useForm } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
defineRule('required', required);
defineRule('email', email);
const { handleSubmit, errors, setFieldValue } = useForm({
  initialValues: {
    username: '',
    email: '',
    password: '',
  },
  validationSchema: {
    username: 'required|min:3',
    email: 'required|email',
    password: 'required|min:6',
  },
});
const onSubmit = handleSubmit((values) => {
  // submit the form
  console.log(values);
});
setFieldValue('username', 'john.doe');

</script>
  