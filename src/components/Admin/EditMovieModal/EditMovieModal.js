import React, { useState } from "react";
import "./EditMovieModal.scss";
import { groupID } from "../../../config/setting";
import { adminManagement } from "../../../services/AdminManagementService";
import swal from "sweetalert";
import { Fragment } from "react";
export default function EditMovieModal(props) {
  let { movie } = props;
  let [state, setState] = useState({
    values: {
      image: movie.image,
      movieId: movie.movieId,
      movieTitle: movie.movieTitle,
      alias: movie.alias,
      trailer: movie.trailer,
      description: movie.description,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
      groupCode: groupID,
    },
    errors: {
      movieId: "",
      movieTitle: "",
      alias: "",
      image: "",
      trailer: "",
      description: "",
      releaseDate: "",
      groupCode: "",
      rating: "",
    },
  });

  const handleChangeInput = (event) => {
    let { value, name } = event.target;
    let moment = require("moment");
    //tạo ra object this.state.values mới
    let newValues = {
      ...state.values,
      [name]: value,
    };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "không được bỏ trống!" : "",
    };

    // if (name === "img ") {
    //   newValues[name] = event.target.files[0];
    // }
    if (name === "releaseDate") {
      newValues[name] = moment(value, "yyyy-MM-DD").format("DD/MM/yyyy");
    }
    if (name === "movieId") {
      let regexNumberic = /^[0-9]*$/;
      if (value.match(regexNumberic)) {
        newErrors.movieId = "";
      } else {
        newErrors.movieId = "Mã phim chỉ là số";
      }
    }
    if (name === "rating") {
      let regexNumberic = /^[0-9]*$/;
      if (value <= 10 && value >= 0 && value.match(regexNumberic)) {
        newErrors.rating = "";
      } else {
        newErrors.rating = "Chỉ được nhập số từ 1 tới 10";
      }
    }
    setState({ values: newValues, errors: newErrors });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let { values, errors } = state;

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
    // let form_data = new FormData();
    // for (let key in state.values) {
    //   form_data.append(key, state.values[key]);
    // }
    adminManagement
      .editMovie(values)
      .then((res) => {
        swal({
          title: "Sửa phim thành công",
          icon: "success",
          button: "OK",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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

  const renderModal = () => {
    return (
      <div
        className="editMovieModal modal fade"
        id={`d${movie.movieId}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="editMovieModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editMovieModalTitle">
                Sửa phim
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="user-form">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="textb">
                      <input
                        type="text"
                        name="movieId"
                        className="text-secondary"
                        onChange={handleChangeInput}
                        disabled
                        value={state.values.movieId}
                        style={{ cursor: "no-drop" }}
                        required
                      />
                      <div
                        className="placeholder"
                        style={{ left: "10px", top: "-15px" }}
                      >
                        Mã phim
                      </div>
                      <span className="text-danger">{state.errors.movieId}</span>
                    </div>
                    <div className="textb">
                      <input
                        type="text"
                        name="movieTitle"
                        onChange={handleChangeInput}
                        value={state.values.movieTitle}
                        required
                      />
                      <div className="placeholder">Tên phim</div>
                      <span className="text-danger">
                        {state.errors.movieTitle}
                      </span>
                    </div>
                    <div className="textb">
                      <input
                        type="text"
                        name="alias"
                        onChange={handleChangeInput}
                        value={state.values.alias}
                        required
                      />
                      <div className="placeholder">Bí danh</div>
                      <span className="text-danger">{state.errors.alias}</span>
                    </div>
                    <div className="textb">
                      <input
                        type="text"
                        name="img "
                        onChange={handleChangeInput}
                        value={state.values.image}
                        required
                      />
                      <div className="placeholder">Hình ảnh</div>
                      <span className="text-danger">
                        {state.errors.img }
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="textb">
                      <input
                        type="text"
                        name="trailer"
                        onChange={handleChangeInput}
                        value={state.values.trailer}
                        required
                      />
                      <div className="placeholder">Trailer</div>
                      <span className="text-danger">
                        {state.errors.trailer}
                      </span>
                    </div>
                    <div className="textb">
                      <input
                        type="text"
                        name="description"
                        onChange={handleChangeInput}
                        value={state.values.description}
                        required
                      />
                      <div className="placeholder">Mô tả</div>
                      <span className="text-danger">{state.errors.description}</span>
                    </div>
                    <div className="textb">
                      <input
                        type="date"
                        name="releaseDate"
                        onChange={handleChangeInput}
                        // value={state.values.releaseDate}
                        required
                      />
                      <div
                        className="placeholder"
                        style={{ left: "10px", top: "-15px" }}
                      >
                        Ngày khởi chiếu
                      </div>
                      <span className="text-danger">
                        {state.errors.releaseDate}
                      </span>
                    </div>
                    <div className="textb">
                      <input
                        type="text"
                        name="rating"
                        onChange={handleChangeInput}
                        value={state.values.rating}
                        required
                      />
                      <div className="placeholder">Rating</div>
                      <span className="text-danger">
                        {state.errors.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn fas fa-check" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <Fragment>{renderModal()}</Fragment>;
}
