import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
// import AgentsTable from "./agentsTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateSessionEventDialog from "./createSessionEventDialog";
import SessionEventsList from "./sessionEventsList";

const SessionEventsPage: React.FC = () => {
  //   const workingLms = useAppSelector((state) => state.lms.workingLms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div className="grey-title-container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="link"
            style={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <div>Sessions</div>
        </Breadcrumbs>
      </div>
      {/* <p className="grey-title-container">My Workspaces</p> */}
      {/* <Button
        // style={{ maxWidth: 100 }}
        variant="outlined"
        fullWidth
        onClick={() => {
          navigate("/add-member");
        }}
        startIcon={<AddIcon />}
        // sx={{ mt: 3, mb: 2 }}
      >
        Add Session Event
      </Button> */}
      <CreateSessionEventDialog />
      <div className="grey-bordered-container">
        <SessionEventsList />
      </div>
    </div>
  );
};

export default SessionEventsPage;
