import React from "react";
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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
const users = [
  {
    id: "cd4841f4-0ba0-4c8e-bef5-670236740e1d",
    name: "Tessa",
    email: "tessa@example.com",
    role: "user",
  },
  {
    id: "265fa850-d249-4fac-86f2-c6bea8747fcc",
    name: "Anne",
    email: "anne@example.com",
    role: "user",
  },
  {
    id: "56b6c73b-35e1-483c-8a82-94387ee96104",
    name: "John",
    email: "john@example.com",
    role: "user",
  },
  {
    id: "d66a4895-c5a5-413a-b682-96d2720a837b",
    name: "Joy",
    email: "joy@example.com",
    role: "user",
  },
  {
    id: "88fd0c0f-a647-4ca7-b266-8b20057cce98",
    name: "Cindy",
    email: "cindy@example.com",
    role: "admin",
  },
  {
    id: "4756ec3a-010b-4ef2-b59d-558adfccd5ff",
    name: "poppy",
    email: "poppy@example.com",
    role: "user",
  },
  {
    id: "1bf6049c-922c-4334-a37a-d83a75e1620a",
    name: "Ada Lovelace",
    email: "ada@fsa.com",
    role: "user",
  },
  {
    id: "5a5d88fd-7134-4e37-9b42-3834fb320bfd",
    name: "Bobby Buysstuff",
    email: "bb@test.com",
    role: "user",
  },
  {
    id: "abdf5f09-c376-4173-b779-8e214bcba186",
    name: "Allison Admin",
    email: "aa@fsa.com",
    role: "admin",
  },
  {
    id: "30798d1d-ed2a-4b51-921e-b1b9c11cdc1f",
    name: "Sharon Shopper",
    email: "sharon@test.com",
    role: "user",
  },
  {
    id: "2dbc89bc-adce-4e23-ac11-f8d359ef5c3c",
    name: "Clarissa Creditcard",
    email: "ccc@test.com",
    role: "user",
  },
  {
    id: "44ea81f6-c849-4dee-8f86-a556522a3475",
    name: "Melissa Moneybags",
    email: "mm@test.com",
    role: "user",
  },
  {
    id: "f0289769-1727-4eb0-b3fb-bcad0c3da837",
    name: "Maxiel",
    email: "maxiel@fsa.com",
    role: "user",
  },
  {
    id: "b9eee751-545d-49cc-9455-5259441c6bbf",
    name: "Penelope Placeanorder",
    email: "pp@test.com",
    role: "user",
  },
  {
    id: "9d49d2ab-2186-4e9a-a0a0-77c398e545d4",
    name: "Otis Ownsitall",
    email: "oo@test.com",
    role: "user",
  },
  {
    id: "2db679f2-0c43-41fc-8c6f-9eff3bca2b94",
    name: "Galinda Gallery",
    email: "gg@test.com",
    role: "user",
  },
];

export default function UsersList() {
  return (
    <>
      <Typography variant="h3">Users</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
