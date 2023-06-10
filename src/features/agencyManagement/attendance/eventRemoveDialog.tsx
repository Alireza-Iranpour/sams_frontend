import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// import { useDeleteUserLmsMutation } from "./lmsManagementApiSlice";

interface Props {
  userLmsId: number;
  lmsListrefetch: () => void;
}

const EventRemoveDialog: React.FC<Props> = ({ userLmsId, lmsListrefetch }) => {
  const [open, setOpen] = React.useState(false);

  // const [DeleteUserLMS, DeleteUserLMSResults] = useDeleteUserLmsMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeLMS = () => {
    // console.log("removing LMS: ", lmsId);
    // DeleteUserLMS({ userLmsId: userLmsId });
  };

  // useEffect(() => {
  //   try {
  //     lmsListrefetch();
  //   } catch (err) {
  //     //   console.log(err);
  //   }
  // }, [DeleteUserLMSResults.isSuccess]);

  return (
    <React.Fragment>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={handleClickOpen}
        sx={{ margin: "0px" }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove Session Event?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove the session event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              removeLMS();
            }}
            autoFocus
            color="error"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EventRemoveDialog;
