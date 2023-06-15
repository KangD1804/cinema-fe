import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { userLogin, token } from "../../config/setting";
import { userManagement } from "../../services/UserManagementServices";
import { loginAction } from "../../redux/actions/UserManagementActions";
import swal from "sweetalert";
const Login = (props) => {
  let { navigator } = props;
  const dispatch = useDispatch();

  let [state, setState] = useState({
    values: {
      username: "",
      password: "",
    },
    errors: {
      username: "",
      password: "",
    },
  });
  const handleChangeInput = (event) => {
    let { value, name } = event.target;
    let newValues = { ...state.values, [name]: value };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "Không được bỏ trống!" : "",
    };
    setState({ values: newValues, errors: newErrors });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userManagement
      .login(state.values)
      .then((res) => {
        localStorage.setItem(userLogin, JSON.stringify(res.data));
        localStorage.setItem(token, res.data.accessToken);
        dispatch(loginAction(res.data.username));
        swal({
          title: "Đăng nhập thành công",
          text: "Xin chào " + res.data.username,
          icon: "success",
          button: "OK",
        });
        navigator.history.push("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
        swal({
          title: err.response.data,
          icon: "error",
          button: "OK",
        });
      });
  };
  return (
    <section className="backgroundBodyUser">
      <div className="container-fluid">
        <div className="loginForm">
          <NavLink className="img__link" to="/">
            <div className="img__logo">
              <img
                src="https://i0.wp.com/thegamehaus.com/wp-content/uploads/2020/05/Volibear_Emote.png?resize=256%2C256&ssl=1"
                alt="logo"
              />
              <span className="text-logo">CG Cinema</span>
            </div>
          </NavLink>
          <div className="formMessage">
            Đăng nhập để được nhiều ưu đãi, mua vé
            <br />
            và bảo mật thông tin!
          </div>
          <div className="formSocial">
            <form className="formLogin" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="input"
                  name="username"
                  placeholder="Tài khoản"
                  onChange={handleChangeInput}
                />
                <span className="text-danger">{state.errors.username}</span>
              </div>
              <div className="form-group">
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Please enter the password."
                  onChange={handleChangeInput}
                />
                <span className="text-danger">{state.errors.password}</span>
              </div>
              <div className="form-group">
                <button className="btnLogin" type="submit">
                  Đăng nhập
                </button>
              </div>
              <div className="form-group">
                <NavLink className="text-light" to="/register">
                  Bạn chưa có tài khoản?
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

export default Login;
