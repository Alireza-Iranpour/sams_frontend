import React, { useState } from "react";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Autocomplete, FormGroup, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useGetMembersQuery } from "./agencyManagementApiSlice";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRegisterUserMutation } from "../authentication/authApiSlice";

const AddMemberPage: React.FC = () => {
  const [RegisterUser, RegisterUserResults] = useRegisterUserMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [upline, setUpline] = useState(0);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { data, refetch, error, isLoading, isFetching, isSuccess } =
    useGetMembersQuery();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;
    const agentCode = data.get("agentCode") as string;
    // const upline = data.get("upline") as string;
    await RegisterUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      agentCode: agentCode,
      upline: upline,
    });
  };

  useEffect(() => {
    if (RegisterUserResults.data) {
      if (RegisterUserResults.isSuccess) {
        navigate("/dashboard");
      }
    }
  }, [RegisterUserResults.isSuccess]);

  const theme = createTheme();

  const getErrorMessage = (error: any, field: string): [boolean, string] => {
    if (error && error.data && error.data[`${field}`]) {
      return [true, `${error.data[`${field}`]}`];
    }
    return [false, ""];
  };

  return (
    <div>
      {data && (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Add Member
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      // error={
                      //   getErrorMessage(registerUserResult.error, "first_name")[0]
                      // }
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      // helperText={
                      //   getErrorMessage(registerUserResult.error, "first_name")[1]
                      // }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      // error={
                      //   getErrorMessage(registerUserResult.error, "last_name")[0]
                      // }
                      // helperText={
                      //   getErrorMessage(registerUserResult.error, "last_name")[1]
                      // }
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // error={getErrorMessage(registerUserResult.error, "email")[0]}
                      // helperText={
                      //   getErrorMessage(registerUserResult.error, "email")[1]
                      // }
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      // error={
                      //   getErrorMessage(registerUserResult.error, "first_name")[0]
                      // }
                      name="agentCode"
                      fullWidth
                      id="agentCode"
                      label="Agent Code"
                      // helperText={
                      //   getErrorMessage(registerUserResult.error, "first_name")[1]
                      // }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      // error={
                      //   getErrorMessage(registerUserResult.error, "last_name")[0]
                      // }
                      // helperText={
                      //   getErrorMessage(registerUserResult.error, "last_name")[1]
                      // }
                      required
                      fullWidth
                      id="level"
                      label="Level"
                      name="level"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      openOnFocus
                      fullWidth
                      options={data}
                      getOptionLabel={(upline) =>
                        `${upline.first_name} ${upline.last_name} (${upline.level_title[0]})`
                      }
                      autoComplete
                      defaultValue={data.length > 0 ? data[0] : null}
                      onChange={(event, upline) => {
                        setUpline(upline!.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          // margin="normal"
                          label="Upline"
                          id="upline"
                          name="upline"
                          // size="small"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <LoadingButton
                  loading={RegisterUserResults.isLoading}
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Member
                </LoadingButton>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
};

export default AddMemberPage;
