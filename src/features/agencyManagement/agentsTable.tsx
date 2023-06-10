import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetMembersQuery } from "./agencyManagementApiSlice";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(
//   agentName: string,
//   agentCode: string,
//   upline: string,
//   level: string,
//   points: number
// ) {
//   return { agentName, agentCode, upline, level, points };
// }

// const rows = [
//   createData("Nima Attar", "12345", "Dave Boushehri", "CEO", 50000),
//   createData("Nima Attar", "12345", "Dave Boushehri", "CEO", 50000),
//   createData("Nima Attar", "12345", "Dave Boushehri", "CEO", 50000),
//   createData("Nima Attar", "12345", "Dave Boushehri", "CEO", 50000),
//   createData("Nima Attar", "12345", "Dave Boushehri", "CEO", 50000),
// ];

export default function AgentsTable() {
  const {
    data: membersData,
    refetch,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetMembersQuery();

  useEffect(() => {
    refetch();
    // console.log(userLmsesData);
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Agent Name</StyledTableCell>
              <StyledTableCell align="left">Level</StyledTableCell>
              <StyledTableCell align="left">Immediate Upline</StyledTableCell>
              <StyledTableCell align="left">Senior Upline</StyledTableCell>
              <StyledTableCell align="left">Agent Code</StyledTableCell>
              <StyledTableCell align="left">Points</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess &&
              membersData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.first_name + " " + row.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.level_title[0]}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.upline &&
                      row.upline.first_name + " " + row.upline.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.senior_upline &&
                      row.senior_upline.first_name +
                        " " +
                        row.senior_upline.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.agent_code && row.agent_code.toUpperCase()}
                  </StyledTableCell>
                  <StyledTableCell align="left">{5000}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
