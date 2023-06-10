import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  LoginUserTokenResponse,
  useLoginUserTokenMutation,
  useRefreshTokenMutation,
} from "./authApiSlice";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FormGroup, FormHelperText } from "@mui/material";
import { setAuthToken, setIsAuthenticated, setUser } from "./authSlice";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLazyGetUserProfileQuery } from "../userProfile/userProfileApiSlice";
// import {
//   useGetUserProfileQuery,
//   useLazyGetUserProfileQuery,
// } from "../userProfile/userProfileApiSlice";

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const [loginUser, loginUserResult] = useLoginUserTokenMutation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const authToken = useAppSelector((state) => state.auth.authToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [GetUserProfile, UserProfileResults] = useLazyGetUserProfileQuery();

  const handleLogin = async (data: LoginUserTokenResponse) => {
    dispatch(setAuthToken({ authToken: data }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    await loginUser({ email: email, password: password })
      .unwrap()
      .then(async (data) => {
        handleLogin(data);
        GetUserProfile()
          .unwrap()
          .then((data) => {
            console.log(data);
            dispatch(
              setUser({
                user: { firstName: data.first_name, lastName: data.last_name },
              })
            );
            dispatch(setIsAuthenticated(true));
            navigate("/profile");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(loginUserResult.data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={loginUserResult.isError}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={loginUserResult.isError}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            // type="password"
            id="password"
            autoComplete="current-password"
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
          />
          <FormGroup>
            <FormHelperText error={loginUserResult.isError}>
              {/* {JSON.stringify(loginUserResult.error)} */}
              {loginUserResult.isError
                ? "No active account found with the given credentials"
                : ""}
            </FormHelperText>
          </FormGroup>
          <LoadingButton
            loading={loginUserResult.isLoading}
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link to="/reset-password" className="link">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" className="link">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
