import React, { Component } from "react";
import "./AddMovieModal.scss";
import { adminManagement } from "../../../services/AdminManagementService";
import swal from "sweetalert";
export default class AddMovieModal extends Component {
  state = {
    values: {
      movieId: "",
      movieTitle: "",
      alias: "",
      image: {},
      trailer: "",
      description: "",
      releaseDate: "",
      rating: "",
      groupCode: "",
    },
    errors: {
      movieId: "",
      movieTitle: "",
      alias: "",
      imageUrl: "",
      trailer: "",
      description: "",
      releaseDate: "",
      rating: "",
      groupCode: "",
    },
  };
  handleChangeInput = (event) => {
    var { value, name } = event.target;
    //tạo ra object this.state.values mới
    let newValues = {
      ...this.state.values,
      [name]: value,
    };
    let newErrors = {
      ...this.state.errors,
      [name]: value === "" ? "không được bỏ trống!" : "",
    };

    if (name === "hinhAnh") {
      newValues[name] = event.target.files[0];
    }
    if (name === "ngayKhoiChieu") {
      var moment = require("moment");
      // console.log(value);
      newValues[name] = moment(value, "yyyy-MM-DD").format("DD/MM/yyyy");
    }
    if (name === "danhGia") {
      let regexNumberic = /^[0-9]*$/;
      if (value <= 10 && value >= 0 && value.match(regexNumberic)) {
        newErrors.danhGia = "";
      } else {
        newErrors.danhGia = "Chỉ được nhập số từ 1 tới 10";
      }
    }

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
    } else {
      // gọi api hoạc dispatch redux
      var form_data = new FormData();
      for (let key in this.state.values) {
        form_data.append(key, this.state.values[key]);
      }
      adminManagement
        .addMovie(form_data)
        .then((res) => {
          swal({
            title: "Thêm phim thành công",
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
    }
  };

  render() {
    return (
        <div
            className="modal fade"
            id="addMovieModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="addMovieModal"
            aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addMovieModalTitle">
                  Add Movie
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
                <form onSubmit={this.handleSubmit} className="user-form">
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <div className="textb">
                        <input
                            type="file"
                            name="image"
                            onChange={this.handleChangeInput}
                        />
                        <div className="placeholder" style={{ top: "-20px" }}>
                          Image
                        </div>
                        <span className="text-danger">
                        {this.state.errors.image}
                      </span>
                      </div>
                      <div className="textb">
                        <input
                            type="text"
                            name="movieId"
                            onChange={this.handleChangeInput}
                            required
                        />
                        <div className="placeholder">Movie ID</div>
                        <span className="text-danger">
                        {this.state.errors.movieId}
                      </span>
                      </div>
                      <div className="textb">
                        <input
                            type="text"
                            name="movieTitle"
                            onChange={this.handleChangeInput}
                            required
                        />
                        <div className="placeholder">Movie Title</div>
                        <span className="text-danger">
                        {this.state.errors.movieTitle}
                      </span>
                      </div>
                      <div className="textb">
                        <input
                            type="text"
                            name="slug"
                            onChange={this.handleChangeInput}
                            required
                        />
                        <div className="placeholder">Slug</div>
                        <span className="text-danger">
                        {this.state.errors.slug}
                      </span>
                      </div>
                      <div className="textb">
                        <input
                            type="text"
                            name="trailer"
                            onChange={this.handleChangeInput}
                            required
                        />
                        <div className="placeholder">Trailer</div>
                        <span className="text-danger">
                        {this.state.errors.trailer}
                      </span>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="textb">
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleChangeInput}
                            required
                        />
                        <div className="placeholder">Description</div>
                        <span className="text-danger">
                        {this.state.errors.description}
                      </span>
                      </div>
                      <div className="textb">
                        <input
                            type="date"
                            name="releaseDate"
                            min="today"
                            onChange={this.handleChangeInput}
                            required
                        />
                        <div
                            className="placeholder"
                            style={{ left: "10px", top: "-20px" }}
                        >
                          Release Date
                        </div>
                        <span className="text-danger">
                        {this.state.errors.releaseDate}
                      </span>
                      </div>
                      <div className="textb">
                        <input
                            type="text"
                            name="rating"
                            onChange={this.handleChangeInput}
                            required
                        />
                        <div className="placeholder">Rating</div>
                        <span className="text-danger">
                        {this.state.errors.rating}
                      </span>
                      </div>
                      <div className="textb">
                        <input
                            type="text"
                            name="groupCode"
                            onChange={this.handleChangeInput}
                            required
                        />
                        <div className="placeholder">Group Code</div>
                        <span className="text-danger">
                        {this.state.errors.groupCode}
                      </span>
                      </div>
                    </div>
                  </div>
                  <button className="btn fas fa-arrow-right" />
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
