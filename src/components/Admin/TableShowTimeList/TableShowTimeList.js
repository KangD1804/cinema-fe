import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./TableShowTimeList.scss";
import { movieManagement } from "../../../services/MovieManagementServices";

let moment = require("moment");
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e1f5fe",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
export default function TableShowTimeList(props) {
  let { movieId } = props;
  let [thongTinLichChieu, setThongTinLichChieu] = useState([]);

  useEffect(() => {
    movieManagement
      .getMovieInfo(movieId)
      .then((res) => {
        setThongTinLichChieu(res.data);
      })
      .catch((err) => {});
  }, [movieId]);

  const renderTable = () => {
    return thongTinLichChieu?.heThongRapChieu?.map((theatre, index) => {
      return theatre.cumRapChieu.map((cumRap) => {
        return cumRap.lichChieuPhim.map((lichChieu) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              <TableCell>{lichChieu.maLichChieu}</TableCell>
              <TableCell>
                <img
                  src={theatre.logo}
                  alt={theatre.logo}
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </TableCell>
              <TableCell>
                <div>{cumRap.tenCumRap}</div>
              </TableCell>
              <TableCell>{lichChieu.tenRap}</TableCell>
              <TableCell>
                {moment(lichChieu.ngayChieuGioChieu).format("DD/MM/yyyy")}
              </TableCell>
              <TableCell>
                {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
              </TableCell>
              <TableCell>{lichChieu.giaVe + "Đ"}</TableCell>
            </TableRow>
          );
        });
      });
    });
  };
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Mã lịch chiếu</StyledTableCell>
              <StyledTableCell>Hệ thống rạp</StyledTableCell>
              <StyledTableCell>Tên cụm rạp</StyledTableCell>
              <StyledTableCell>Tên rạp</StyledTableCell>
              <StyledTableCell>Ngày chiếu</StyledTableCell>
              <StyledTableCell>Giờ chiếu</StyledTableCell>
              <StyledTableCell>Giá vé</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTable()}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
