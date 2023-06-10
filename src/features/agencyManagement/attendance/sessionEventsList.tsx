import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useGetSessionEventsQuery } from "./attendanceApiSlice";
import LmsRemoveDialog from "./eventRemoveDialog";
import LmsModifyDialog from "./eventModifyDialog";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { setLms } from "../lms/lmsSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function getDayName(dateString: string) {
  // Parse the date string into a Date object
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are zero-based
  const day = parseInt(dateParts[2]);
  const date = new Date(year, month, day);

  // Array of weekday names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the day index from 0 to 6 (Sunday to Saturday)
  const dayIndex = date.getDay();

  // Return the day name
  return daysOfWeek[dayIndex];
}

const SessionEventsList: React.FC = () => {
  const {
    data: eventsData,
    refetch,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetSessionEventsQuery();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const workingLms = useAppSelector((state) => state.lms.workingLms);

  // const addLmsItem = () => {
  //   navigate("/add-lms");
  // };

  const setWorkingLms = (inputObject: {
    lmsId: number;
    userLmsId: number;
    lmsType: string;
    lmsBaseUrl: string;
    lmsAccessToken: string;
  }) => {
    // dispatch(
    //   setLms({
    //     workingLms: {
    //       lmsId: inputObject.lmsId,
    //       userLmsId: inputObject.userLmsId,
    //       lmsType: inputObject.lmsType,
    //       lmsBaseUrl: inputObject.lmsBaseUrl,
    //       lmsAccessToken: inputObject.lmsAccessToken,
    //     },
    //   })
    // );
  };

  useEffect(() => {
    // refetch();
    // console.log(userLmsesData);
  }, []);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
  });

  return (
    <div>
      {/* <Button
        // style={{ maxWidth: 100 }}
        variant="outlined"
        fullWidth
        onClick={addLmsItem}
        startIcon={<AddIcon />}
        // sx={{ mt: 3, mb: 2 }}
      >
        Add Workspace
      </Button> */}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {isSuccess &&
            eventsData!.map((event, index) => (
              <React.Fragment key={index}>
                <ListItem
                  // alignItems="flex-start"
                  sx={{ width: "100%" }}
                  secondaryAction={
                    <Box>
                      <LmsModifyDialog
                        userLmsId={event.id}
                        lmsListrefetch={refetch}
                        handleClickSnackbar={handleClickSnackbar}
                      />

                      <LmsRemoveDialog
                        userLmsId={event.id}
                        lmsListrefetch={refetch}
                      />
                    </Box>
                  }
                >
                  <ListItemText
                    sx={{ marginRight: "50px" }}
                    primary={
                      <Link
                        className="link"
                        onClick={() => {
                          // setWorkingLms({
                          //   lmsId: lms.lms,
                          //   userLmsId: lms.id,
                          //   lmsType: lms.lms_type,
                          //   lmsBaseUrl: lms.lms_base_url,
                          //   lmsAccessToken: lms.access_token,
                          // });
                        }}
                        to={`/attendance/events/${event.id}`}
                        // style={{ fontWeight: "bold" }}
                      >
                        {`${index + 1}. ${event.event_name}: (${
                          event.event_date
                        } ${getDayName(event.event_date)})`}
                      </Link>
                    }
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      ></Typography>
                    }
                  />
                </ListItem>
                {index !== eventsData!.length - 1 && <Divider />}
              </React.Fragment>
            ))}
        </List>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Event updated!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SessionEventsList;
