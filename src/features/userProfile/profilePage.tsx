import React from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../authentication/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "./userProfileApiSlice";
import { textAlign } from "@mui/system";

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const {
    data: profileData,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserProfileQuery();

  const onclick = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div>
        {
          // isSuccess
          true ? (
            <p
              style={{
                textAlign: "center",
                fontSize: 30,
              }}
            >
              {`Welcome ${capitalizeFirstLetter(user!.firstName)}!`}
            </p>
          ) : (
            ""
          )
        }
      </div>
    </div>
  );
};

export default ProfilePage;
