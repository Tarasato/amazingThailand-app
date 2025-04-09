import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  CssBaseline,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BG from './../assets/BG.png';
import Profile from './../assets/logo.png';

const API_URL = import.meta.env.VITE_API;

function AddPostUI() {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      {/* ================= AppBar ================= */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#123458', boxShadow: 'none' }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 1 }}>
              <img src='logo.png' width={40} alt="logo" />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              Amazing Thailand
            </Typography>
            <TextField
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '26px',
                  backgroundColor: 'white',
                },
                width: '40%',
                marginLeft: 5,
                marginRight: 1,
              }}
            />
            <IconButton sx={{ border: '1px solid white' }}>
              <SearchIcon sx={{ color: 'white' }} />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Typography sx={{ color: 'white', fontWeight: 'bold', marginRight: 2 }}>
              สมฤทัย
            </Typography>
            <IconButton sx={{ backgroundColor: 'white', mr: 2 }}>
              <img src={Profile} width={24} />
            </IconButton>
            <Button color="inherit" onClick={() => navigate("/login")}>
              ออกจากระบบ
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* ================ Background & Form ================ */}
      {/* Background with Thai pattern overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: -1,
          backgroundColor: '#030303',
        }}
      >
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

      {/* Form */}

      <Box
        width="100%"
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ paddingTop: 8 }}
      >
        {/* ข้อความใหญ่ด้านบนสุด */}
        <Typography
          variant="h2"
          sx={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}
        >
          สร้างโพสต์ใหม่
        </Typography>

        {/* กล่องสองฝั่ง: ซ้ายเป็น +, ขวาเป็นฟอร์ม */}
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="60%"
          sx={{ display: 'flex', gap: 5 }}
        >
          {/* ด้านซ้าย (ปุ่ม + ใหญ่) */}
          <Box
            sx={{
              width: 500,
              height: 500,
              backgroundColor: '#f1efec',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: 300 }}>+</Typography>
          </Box>

          {/* ด้านขวา (ฟอร์มกรอกข้อมูล) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              color: 'white',
              width: '50%',
            }}
          >
            <Typography variant="h6">ชื่อสถานที่</Typography>
            <TextField
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '26px',
                  borderColor: 'black',

                  backgroundColor: 'white',
                },
              }}
            />
            <Button

              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                mt: 3,
                fontWeight: 'bold',
                fontSize: '20px',
                backgroundColor: '#0B3C71',
                borderRadius: '30px',
                '&:hover': {
                  backgroundColor: '#0A2E5D',
                }
              }}
            >
              สร้างโพสต์
            </Button>
          </Box>
        </Box>
      </Box>


    </>
  );
}

export default AddPostUI;
