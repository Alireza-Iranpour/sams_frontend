import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const PageNotFound: React.FC = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ width: "100", textAlign: "center", marginTop: "50px" }}
    >
      <Box>
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">
          The page you’re looking for doesn’t exist.
        </Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound;
