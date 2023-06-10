import React from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../authentication/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "./userProfileApiSlice";
import { textAlign } from "@mui/system";
import EngineTokenDialog from "./calendlyTokenDialog";

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const SettingsPage = () => {
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
      <div style={{ fontSize: 20, margin: "30px" }}>Settings</div>

      <EngineTokenDialog />
    </div>
  );
};

export default SettingsPage;
