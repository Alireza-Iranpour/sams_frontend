import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

interface Props {}

const CreateSessionEventDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  // const engineToken = useAppSelector((state) => state.lms.engineToken);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const [engineTokenError, setEngineTokenError] =
    React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
    setEngineTokenError(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEngineTokenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    // setEngineTokenError(newValue.trim() === "");
  };

  //   React.useEffect(() => {}, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const engineToken = data.get("engine_token") as string;
    // dispatch(setEngineToken({ engineToken: engineToken }));
  };

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        onClick={handleClickOpen}
        style={{ margin: "auto" }}
      >
        Create Session Event
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Session Event</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Event Name"
              // defaultValue={engineToken}
              id="event_name"
              name="event_name"
              size="small"
              onChange={handleEngineTokenChange}
              error={engineTokenError}
              helperText={engineTokenError ? "Engine token is required" : ""}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Event Date"
                format="YYYY-MM-DD ddd"
                defaultValue={dayjs()}
                slotProps={{
                  actionBar: {
                    actions: ["today", "cancel", "accept"],
                  },
                }}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              disabled={engineTokenError}
              onClick={() => {
                handleClose();
              }}
            >
              Set
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateSessionEventDialog;
