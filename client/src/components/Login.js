import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import '../App.css'

function Login({ touched, errors }) {
  return (
    <Form className="form">
      <h1>Welcome to the Bubble App!</h1>
      <div className="form-box">
        <label className="label">Username</label>
        <Field
          className="input"
          name="username"
          type="text"
          autoComplete="off"
        />
        <p>{touched.username && errors.username}</p>
      </div>
      <div className="form-box">
        <label className="label">Password</label>
        <Field
          className="input"
          name="password"
          type="password"
          autoComplete="off"
        />
        <p>{touched.password && errors.password}</p>
      </div>
      <button type="submit" className="btn">
        Submit &rarr;
      </button>
    </Form>
  );
}
export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6)
      .required("Password is required")
  }),
  handleSubmit(values, formikBag) {
    const url = "http://localhost:5000/api/login";
    // make a post request to retrieve a token from the api
    axios
      .post(url, values)
      .then(res => {
        // when you have handled the token, navigate to the BubblePage route
        localStorage.setItem("token", res.data.payload);
        formikBag.props.history.push("/bubblepage");
      })
      .catch(e => {
        console.log(e.response);
      });
  }
})(Login);


