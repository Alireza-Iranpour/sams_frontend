import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import {
//   useGetUserLmsQuery,
//   useUpdateUserLmsMutation,
// } from "./lmsManagementApiSlice";

interface Props {
  userLmsId: number;
  lmsListrefetch: () => void;
  handleClickSnackbar: () => void;
}

const EventModifyDialog: React.FC<Props> = ({
  userLmsId,
  lmsListrefetch,
  handleClickSnackbar,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const [baseUrlError, setBaseUrlError] = React.useState<boolean>(false);
  const [accessTokenError, setAccessTokenError] =
    React.useState<boolean>(false);

  // const [UpdateUserLMS, UpdateUserLMSResults] = useUpdateUserLmsMutation();
  // const {
  //   data: lmsData,
  //   refetch: lmsRefetch,
  //   error: lmsError,
  //   isLoading,
  //   isFetching,
  //   isSuccess,
  // } = useGetUserLmsQuery({
  //   userLmsId: userLmsId,
  // });

  // const lms_types = [
  //   {
  //     value: "canvas",
  //     label: "Canvas",
  //   },
  // ];

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
    // setBaseUrlError(false);
    console.log(userLmsId);
    setAccessTokenError(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleBaseUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = event.target.value;
  //   setValue(newValue);
  //   setBaseUrlError(newValue.trim() === "");
  // };

  const handleAccessTokenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setValue(newValue);
    setAccessTokenError(newValue.trim() === "");
  };

  // React.useEffect(() => {
  //   try {
  //     UpdateUserLMSResults.isSuccess && handleClickSnackbar();
  //     lmsListrefetch();
  //     lmsRefetch();
  //   } catch (err) {
  //     //   console.log(err);
  //   }
  // }, [UpdateUserLMSResults.isSuccess]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const lms = data.get("lms") as string;
    // const base_url = data.get("base_url") as string;
    const access_token = data.get("access_token") as string;
    // await UpdateUserLMS({
    //   lmsId: +lmsData?.lms!,
    //   userLmsId: userLmsId,
    //   AccessToken: access_token,
    // });
    // console.log(lms, base_url, access_token);
  };

  return (
    <React.Fragment>
      <IconButton
        edge="end"
        aria-label="settings"
        onClick={handleClickOpen}
        sx={{ margin: "0px" }}
      >
        <SettingsIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Modify LMS configuration</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can edit your configuration here
            </DialogContentText>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Access Token"
              // defaultValue={lmsData?.access_token}
              id="access_token"
              name="access_token"
              size="small"
              onChange={handleAccessTokenChange}
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={accessTokenError}
              helperText={accessTokenError ? "This field is required" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              disabled={baseUrlError || accessTokenError}
              onClick={() => {
                handleClose();
              }}
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default EventModifyDialog;
