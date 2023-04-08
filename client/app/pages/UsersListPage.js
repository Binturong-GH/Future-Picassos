import React, { useEffect, useState } from "react";
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
  IconButton,
  Pagination,
  Stack,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../store";

// Router
import { useNavigate } from "react-router-dom";

// from utils
import paginate from "../utils/paginate";

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, users, error } = useSelector((state) => state.users);
  const { isLogged } = useSelector((state) => state.auth);

  // pagination
  const [page, setPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState([]);
  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };
  useEffect(() => {
    if (isLoading) return;
    if (users.length > 0) {
      setUsersPerPage(paginate(users)[page]);
    }
  }, [isLoading, users, page]);

  // check if user is logged and user is an admin
  useEffect(() => {
    if (
      !(
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).role === "admin"
      )
    ) {
      navigate("/");
    } else {
      dispatch(getAllUsers());
    }
  }, [isLogged]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isLoading && error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h3" sx={{ m: 2 }}>
        Users
      </Typography>
      <Box sx={{ m: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    display: {
                      xs: "none",
                      md: "table-cell",
                    },
                  }}
                >
                  Index
                </TableCell>

                <TableCell>ID</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: {
                      xs: "none",
                      md: "table-cell",
                    },
                  }}
                >
                  Name
                </TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: {
                      xs: "none",
                      md: "table-cell",
                    },
                  }}
                >
                  Admin
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: {
                      xs: "none",
                      md: "table-cell",
                    },
                  }}
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersPerPage.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      display: {
                        xs: "none",
                        md: "table-cell",
                      },
                    }}
                  >
                    {user.id}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: {
                        xs: "none",
                        md: "table-cell",
                      },
                    }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: {
                        xs: "none",
                        md: "table-cell",
                      },
                    }}
                  >
                    <Icon color={user.role === "admin" ? "success" : "error"}>
                      {user.role === "admin" ? <CheckIcon /> : <ClearIcon />}
                    </Icon>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: {
                        xs: "none",
                        md: "table-cell",
                      },
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleDeleteUser(user.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Stack spacing={2}>
        <Pagination
          sx={{ mx: "auto" }}
          count={paginate(users).length}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}
