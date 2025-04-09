import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ThaiBG from './../assets/BG.png';//พื้นหลัง
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API;

function LoginUI() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginClick = async (e) => {
    e.preventDefault();
    // Validate UI
    if (userEmail.length == 0) {
      alert("กรุณาป้อนอีเมลด้วย");
      return;
    } else if (userPassword.length == 0) {
      alert("กรุณาป้อนรหัสผ่านด้วย");
      return;
    } else {
      //send data to API and go to MyTravel.jsx("/mytravel") GET
      try {
        const response = await axios.get(
          `${API_URL}/user/${userEmail}/${userPassword}`
        );
        if (response.status == 200) {
          //get data Traveller and save in memory
          localStorage.setItem("user", JSON.stringify(response.data["data"]));
          console.log(localStorage.getItem("user"));  // ตรวจสอบข้อมูลที่เก็บไว้ใน localStorage
          navigate("/");

        } else if (response.status == 404) {
          alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        } else {
          alert("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาด: " + error);
      }
    }
  };
  return (
    <>
      <CssBaseline />
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
          src={ThaiBG}
          alt="background"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.3,
            objectFit: 'cover',
          }}
        />
      </Box>
      {/* กล่องรูปภาพ */}
      <Box
  sx={{
    position: 'fixed',
    top: 40,
    left: 40,
    zIndex: 1, // ให้อยู่ด้านหน้าของพื้นหลัง
  }}
>
  <Button
    variant="contained"
    onClick={() => navigate('/')} // หรือ path ที่ต้องการให้ไปเมื่อคลิก
    sx={{
      backgroundColor: '#0B3C71',
      color: 'white',
      borderRadius: '30px',
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      '&:hover': {
        backgroundColor: '#0A2E5D',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
      }
    }}
  >
    เยี่ยมชมเว็บไซต์
  </Button>
</Box>

      {/* Container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          minHeight: '100vh',
          px: { xs: 2, md: "10%" }, // Padding ขอบขวา
        }}
      >
        <Box
          sx={{
            backgroundColor: '#f1efec',
            borderRadius: 5,
            p: 5,
            display: 'flex',
            width: '40%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Stack
            spacing={3}
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
          >
            {/* Logo */}
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <img src='logo.png' width={60} alt="logo" />
              <Typography variant="h5" sx={{ color: '#030303' }}>
                ยินดีต้อนรับสู่ Amazing Thailand
              </Typography>
            </Box>

            {/* Email Field */}
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: '500',
                  marginBottom: '4px',
                  color: '#030303'
                }}
              >
                อีเมล
              </Typography>
              <TextField
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '26px',
                    borderColor: 'black',
                  },
                }}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: '500',
                  marginBottom: '4px',
                  color: '#030303'
                }}
              >
                รหัสผ่าน
              </Typography>
              <TextField
              value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}

                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '26px', borderColor: 'black',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        sx={{ color: '#0B3C71', mr: 0.5 }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}

              />
            </Box>

            {/* Login Button */}
            <Button
              onClick={handleLoginClick}
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
              เข้าสู่ระบบ
            </Button>

            {/* Register link */}
            <Typography fontSize={18} sx={{ mt: 5 }}>
              ยังไม่เป็นสมาชิก?{' '}
              <Button
                onClick={() => navigate('/register')}
                sx={{
                  fontWeight: 'bold',
                  color: '#0B3C71',
                  textTransform: 'none',
                  fontSize: '18px',
                  p: 0,
                  minWidth: 0,
                }}
              >
                สมัครสมาชิก
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Box>



    </>
  );
}

export default LoginUI;