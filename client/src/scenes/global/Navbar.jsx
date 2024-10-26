import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Menu, MenuItem, Drawer } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  Logout,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import Search from "./Search";
import useMediaQuery from "@mui/material/useMediaQuery";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleProfileClick = (event) => {
    if (isMobile) {
      setMobileMenuOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleClose();
    navigate('/');
  };

  const handleCartClick = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    dispatch(setIsCartOpen({}));
    if (isMobile) {
      handleClose();
    }
  };

  const MobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleClose}
    >
      <Box
        sx={{
          width: 250,
          padding: "20px",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Box display="flex" justifyContent="flex-end" marginBottom="20px">
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        
        {user ? (
          <Box>
            <MenuItem disabled sx={{ marginBottom: "10px" }}>
              {user.username}
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ marginBottom: "10px" }}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={() => { handleClose(); navigate('/signin'); }} sx={{ marginBottom: "10px" }}>
              Sign In
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/signup'); }} sx={{ marginBottom: "10px" }}>
              Sign Up
            </MenuItem>
          </Box>
        )}

        <MenuItem onClick={handleCartClick} sx={{ marginBottom: "10px" }}>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 10,
                top: 3,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <ShoppingBagOutlined sx={{ mr: 1 }} />
          </Badge>
          Cart
        </MenuItem>
      </Box>
    </Drawer>
  );

  const DesktopMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {user ? (
        [
          <MenuItem key="username" disabled>
            {user.username}
          </MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>
            <Logout sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        ]
      ) : (
        [
          <MenuItem key="signin" onClick={() => { handleClose(); navigate('/signin'); }}>
            Sign In
          </MenuItem>,
          <MenuItem key="signup" onClick={() => { handleClose(); navigate('/signup'); }}>
            Sign Up
          </MenuItem>
        ]
      )}
    </Menu>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 1)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          ecomms
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <Search />
          {!isMobile && (
            <>
              <IconButton 
                sx={{ color: "black" }}
                onClick={handleProfileClick}
              >
                <PersonOutline />
              </IconButton>
              <Badge
                badgeContent={cart.length}
                color="secondary"
                invisible={cart.length === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 5,
                    top: 5,
                    padding: "0 4px",
                    height: "14px",
                    minWidth: "13px",
                  },
                }}
              >
                <IconButton
                  onClick={handleCartClick}
                  sx={{ color: "black" }}
                >
                  <ShoppingBagOutlined />
                </IconButton>
              </Badge>
            </>
          )}
          <IconButton 
            sx={{ color: "black" }}
            onClick={handleProfileClick}
          >
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </Box>
  );
}

export default Navbar;
