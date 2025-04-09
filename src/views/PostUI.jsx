//rfce
import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BG from './../assets/BG.png'; //background

const API_URL = import.meta.env.VITE_API;

function PostUI() {
  const navigate = useNavigate();
  return (
    <>
    <>
      {/* =========================== AppBar ======================== */}
      <Box sx={{ flexGrow: 1}}>
        <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: '#123458', boxShadow: 'none', }} >

          <Toolbar sx={{ width: "100%" }}>
            {/* logo button */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <img src='logo.png' width={40} alt="logo" />
            </IconButton>
            <Button>
              <Typography variant="h7" component="div" sx={{ color: 'white'}}>
                Amazing Thailand
              </Typography>
            </Button>
            <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={() => navigate("/login")} >
              เข้าสู่ระบบ
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* =========================== All Post ======================== */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1,
        backgroundColor: '#030303',
      }}>
        <img
          src={BG}
          alt="background"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.3,
            objectFit: 'cover',
          }}
        />
      </Box>
    </>
    </>
  )
}

export default PostUI