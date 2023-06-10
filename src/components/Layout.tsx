import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AccountTooltip from "./AccountTooltip";
import { Link, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import logo from "../assets/logo.png";

interface Props {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<Props> = ({ children }) => {
  const [tabIndex, setTabIndex] = React.useState<number | boolean>(0);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [activeMenuItem, setActiveMenuItem] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();

  const pages = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Pricing", link: "/pricing" },
  ];

  if (isAuthenticated) {
    pages.push({ title: "Dashboard", link: "/dashboard" });
    pages.push({ title: "Attendance", link: "/attendance" });
  }

  useEffect(() => {
    // switch (location.pathname) {
    //   case "/":
    //     setTabIndex(0);
    //     break;
    //   case "/about":
    //     setTabIndex(1);
    //     break;
    //   case "/pricing":
    //     setTabIndex(2);
    //     break;
    //   case "/workspaces":
    //     setTabIndex(3);
    //     break;
    //   default:
    //     setTabIndex(0);
    // }
    switch (true) {
      case location.pathname === "/":
        setTabIndex(0);
        break;
      case location.pathname === "/about":
        setTabIndex(1);
        break;
      case location.pathname === "/pricing":
        setTabIndex(2);
        break;
      case location.pathname.startsWith("/dashboard"):
        setTabIndex(3);
        break;
      case location.pathname.startsWith("/attendance"):
        setTabIndex(4);
        break;
      default:
        setTabIndex(false);
    }
  }, [location]);

  return (
    <div>
      {/* bgcolor: "#001529" */}
      <AppBar position="static" sx={{ bgcolor: "#003261" }}>
        <Container maxWidth={false} sx={{ maxWidth: 1300 }}>
          <Toolbar disableGutters>
            {/* ------------------------------------------------------------------------ */}
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img src={logo} width={50} alt="icon" />
            </Box>

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={"/"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Bruno Ace SC",
                fontWeight: 500,
                letterSpacing: "0rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SAMS
            </Typography>
            {/* ------------------------------------------------------------------------ */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.link}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        textTransform: "none",
                        fontSize: 20,
                        fontFamily: "Segoe UI",
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* ------------------------------------------------------------------------ */}
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <img src={logo} width={50} alt="icon" />
            </Box>

            <Typography
              variant="h5"
              noWrap
              component={Link}
              to={"/"}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Bruno Ace SC",
                fontWeight: 500,
                letterSpacing: "0rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SAMS
            </Typography>
            {/* ------------------------------------------------------------------------ */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {
                <Tabs
                  textColor="inherit"
                  value={
                    typeof tabIndex === "number" && tabIndex >= pages.length
                      ? false
                      : tabIndex
                  }
                  onChange={(e, index) => setTabIndex(index)}
                  // TabIndicatorProps={{ style: { display: "none" } }}
                >
                  {pages.map((page, index) => (
                    <Tab
                      key={index}
                      label={page.title}
                      component={Link}
                      to={page.link}
                      sx={{
                        textTransform: "none",
                        fontSize: 16,
                        fontFamily: "Open Sans",
                        fontWeight: "inherit",
                        // borderRadius: "20px",
                      }}
                    />
                  ))}
                </Tabs>
              }
            </Box>
            {/* ------------------------------------------------------------------------ */}
            {isAuthenticated ? (
              <AccountTooltip />
            ) : (
              <Button
                variant="contained"
                // color="inherit"

                component={Link}
                to="/login"
                sx={{
                  minWidth: "100px",
                  textTransform: "none",
                  fontSize: 16,
                  fontFamily: "Segoe UI",
                }}
              >
                Sign in
              </Button>
            )}
            {/* ------------------------------------------------------------------------ */}
          </Toolbar>
        </Container>
      </AppBar>
      {/* ------------------------------------------------------------------------ */}
      {/* <Container maxWidth="lg" sx={{ p: 2 }}> */}
      <Container
        maxWidth={false}
        sx={{ maxWidth: 1300, marginY: "10px", paddingX: "5px" }}
      >
        {children}
      </Container>
      {/* ------------------------------------------------------------------------ */}
    </div>
  );
};
export default ResponsiveLayout;
