import React, { useState } from "react";
import "./UploadImageMovieModal.scss";
import swal from "sweetalert";
import { adminManagement } from "../../../services/AdminManagementService";
import { groupID } from "../../../config/setting";
export default function UploadImageMovieModal(props) {
  let { phim } = props;

  let [state, setState] = useState({
    values: {
      movieTitle: phim.movieTitle,
      hinhAnh: {},
      maNhom: groupID,
    },
    errors: {
      movieTitle: "",
    },
  });

  const handleInput = (e) => {
    var { value, name } = e.target;
    let newValues = { ...state.values, [name]: value };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "This field unempty !" : "",
    };
    if (name === "hinhAnh") {
      newValues[name] = e.target.files[0];
    }

    setState({ values: newValues, errors: newErrors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let { values, errors } = state;
    for (let key in values) {
      if (values[key] === "") {
        valid = false;
      }
    }
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
      }
    }
    if (!valid) {
      alert("Invalid information");
      return;
    }

    let frm = new FormData();
    frm.append("File", values.hinhAnh);
    frm.append("tenphim", values.movieTitle);
    frm.append("manhom", values.maNhom);

    adminManagement
      .uploadMovieImage(frm)
      .then(() => {
        swal({
          title: "Upload hình ảnh thành công",
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
          icon: "warning",
          button: "OK",
        });
      });
  };
  return (
    <div
      className="upLoadMovieModal modal fade"
      id={`du${phim.movieId}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="addNewsModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addNewsModalTitle">
              Thêm hình ảnh
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
                      name="movieTitle"
                      value={state.values.movieTitle}
                      required
                      // disabled
                    />
                    <div className="placeholder" style={{ top: "-20px" }}>
                      Tên phim
                    </div>
                    <span className="text-danger">{state.errors.movieTitle}</span>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="textb">
                    <input type="file" name="hinhAnh" onChange={handleInput} />
                    <div className="placeholder" style={{ top: "-20px" }}>
                      Hình ảnh
                    </div>
                    <span className="text-danger">{state.errors.hinhAnh}</span>
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
