import React, { useEffect } from "react";
// MUI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Icon,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store";

// Router
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, users, error } = useSelector((state) => state.users);
  const { isLogged } = useSelector((state) => state.auth);
  // check if user is logged and user is an admin
  useEffect(() => {
    if (
      !(
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).role === "admin"
      )
    ) {
      navigate("/");
    }
  }, [isLogged]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isLoading && error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h3">Users</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Index</TableCell>

              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  <Icon color={user.role === "admin" ? "success" : "error"}>
                    {user.role === "admin" ? <CheckIcon /> : <ClearIcon />}
                  </Icon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
