/*
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../Register/Register.scss";
import { userManagement } from "../../services/UserManagementServices";
import { groupID } from "../../config/setting";
import swal from "sweetalert";
export default class Register extends Component {
  state = {
    values: {
      hoTen: "",
      account: "",
      matKhau: "",
      email: "",
      soDT: "",
      role: "KhachHang",
      maNhom: groupID,
    },
    errors: {
      hoTen: "",
      account: "",
      matKhau: "",
      email: "",
      soDT: "",
    },
  };
  handleChangeInput = (event) => {
    var { value, name } = event.target;
    //tạo ra object this.state.values mới
    let newValues = {
      ...this.state.values,
      [name]: value,
    };

    //set trường hợp rỗng
    //tạo ra object this.state.errors mới
    let newErrors = {
      ...this.state.errors,
      [name]: value === "" ? "không được bỏ trống!" : "",
    };

    if (name === "email") {
      let regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (value.match(regexEmail)) {
        newErrors.email = "";
      } else {
        newErrors.email = "Email không hợp lệ";
      }
    }
    //setState lại values và errors
    this.setState({ values: newValues, errors: newErrors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let { values, errors } = this.state;
    for (let key in values) {
      if (values[key] === "") {
        // kiểm tra lỗi
        valid = false;
      }
    }
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
      }
    }
    if (!valid) {
      alert("thông tin không hợp lệ");
      return;
    }
    // gọi api hoạc dispatch redux
    let { navigator } = this.props;
    userManagement
      .signup(values)
      .then((res) => {
        swal({
          title: "Đăng ký thành công",
          icon: "success",
          button: "OK",
        });
        navigator.history.push("/login");
      })
      .catch((err) => {
        swal({
          title: err.response.data,
          text: "Điền lại thông tin!",
          icon: "warning",
          button: "OK",
        });
      });
  };

  render() {
    return (
      <section className="backgroundBody">
        <div className="container-fluid">
          <div className="registerForm">
            <div className="img__logo">
              <NavLink className="img__link" to="/">
                <img
                  src="https://i0.wp.com/thegamehaus.com/wp-content/uploads/2020/05/Volibear_Emote.png?resize=256%2C256&ssl=1"
                  alt="logo"
                />
                <span className="text-logo">CG Cinema</span>
              </NavLink>
            </div>
            <div className="formSocial">
              <form className="formRegister">
                <div className="form-group">
                  <input
                    className="input"
                    name="account"
                    placeholder="Tên tài khoản"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">
                    {this.state.errors.account}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    name="matKhau"
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">
                    {this.state.errors.matKhau}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    name="hoTen"
                    type="text"
                    placeholder="Họ tên"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">{this.state.errors.hoTen}</span>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">{this.state.errors.email}</span>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    name="soDT"
                    type="text"
                    placeholder="Số điện thoại"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">
                    {this.state.errors.soDienThoai}
                  </span>
                </div>
                <div className="form-group">
                  <button
                    className="btnLogin"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Đăng ký
                  </button>
                </div>
                <div className="form-group">
                  <NavLink className="text-light" to="/login">
                    Bạn đã có tài khoản?
                  </NavLink>
                </div>
              </form>
            </div>
            <NavLink className="close__btn" to="/"></NavLink>
          </div>
        </div>
      </section>
    );
  }
}
*/

import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Register/Register.scss";
import { userManagement } from "../../services/UserManagementServices";
import { groupID } from "../../config/setting";
import swal from "sweetalert";

const Register = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      role: "customer",
      groupCode: groupID,
    },
    validationSchema,
    onSubmit: (values) => {
      userManagement
          .signup(values)
          .then((res) => {
            swal({
              title: "Đăng ký thành công",
              icon: "success",
              button: "OK",
            });
            formik.resetForm();
          })
          .catch((err) => {
            console.log(err)
            swal({
              title: err.response.data,
              text: "Điền lại thông tin!",
              icon: "warning",
              button: "OK",
            });
          });
    },
  });

  return (
      <section className="backgroundBody">
        <div className="container-fluid">
          <div className="registerForm">
            <div className="img__logo">
              <NavLink className="img__link" to="/">
                <img
                    src="https://i0.wp.com/thegamehaus.com/wp-content/uploads/2020/05/Volibear_Emote.png?resize=256%2C256&ssl=1"
                    alt="logo"
                />
                <span className="text-logo">CG Cinema</span>
              </NavLink>
            </div>
            <div className="formSocial">
              <form className="formRegister" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                      className="input"
                      name="firstName"
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                  />
                  <span className="text-danger">
                  {formik.touched.firstName && formik.errors.firstName}
                </span>
                </div>
                <div className="form-group">
                  <input
                      className="input"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                  />
                  <span className="text-danger">
                  {formik.touched.lastName && formik.errors.lastName}
                </span>
                </div>
                <div className="form-group">
                  <input
                      className="input"
                      name="username"
                      placeholder="Username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                  />
                  <span className="text-danger">
                  {formik.touched.username && formik.errors.username}
                </span>
                </div>
                <div className="form-group">
                  <input
                      className="input"
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                  />
                  <span className="text-danger">
                  {formik.touched.password && formik.errors.password}
                </span>
                </div>
                <div className="form-group">
                  <input
                      className="input"
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                  />
                  <span className="text-danger">
                  {formik.touched.email && formik.errors.email}
                </span>
                </div>
                <div className="form-group">
                  <input
                      className="input"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                  />
                  <span className="text-danger">
                  {formik.touched.phoneNumber && formik.errors.phoneNumber}
                </span>
                </div>
                <div className="form-group">
                  <button className="btnLogin" type="submit">
                    Đăng ký
                  </button>
                </div>
                <div className="form-group">
                  <NavLink className="text-light" to="/login">
                    Bạn đã có tài khoản?
                  </NavLink>
                </div>
              </form>
            </div>
            <NavLink className="close__btn" to="/"></NavLink>
          </div>
        </div>
      </section>
  );
};

export default Register;
