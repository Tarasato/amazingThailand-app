import React, { useState, useRef } from 'react'
import {
  Box,
  CssBaseline,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BG from './../assets/BG.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import axios from 'axios';
import NotificationPopup from './NotificationPopup';

const API_URL = import.meta.env.VITE_API;

function RegisterUI() {
  const navigate = useNavigate();
  const fileInputRef = useRef(); // <- สำคัญ
  const [showNotification, setShowNotification] = useState(false);


  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);


  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // สั่งให้ input ทำงาน
    }
  };
  // เมื่อเลือกไฟล์
  const handleSelectFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
      console.log('Selected file:', file);
    }
  };


  const handleRegisterClick = async (e) => {
    console.log(userName, userEmail, userPassword);
    //Validate Register Button
    e.preventDefault();
    if (userName.trim().length == 0) {
      alert("ป้อนชื่อผู้ใช้งานด้วย");
    } else if (userEmail.trim().length == 0) {
      alert("ป้อนอีเมล์ด้วย");
    } else if (userPassword.trim().length == 0) {
      alert("ป้อนรหัสผ่านด้วย");
    }
    else if (userPassword !== userConfirmPassword) {
      alert("รหัสผ่านต้องตรงกัน");

    }
    else if (userImage == null) {
      alert("เลือกรูปภาพด้วย")
    } else {
      //ส่งข้อมูลไปให้ API บันทึงลง DB แล้ว redirect ไปหน้า Login
      const formData = new FormData();

      formData.append("userName", userName);
      formData.append("userEmail", userEmail);
      formData.append("userPassword", userPassword);

      if (userImage) {
        formData.append("userImage", userImage);
      }

      try {
        const response = await axios.post(
          `${API_URL}/user/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status == 201) {
          alert("ลงทะเบียนสําเร็จ");
          navigate("/login");  // เปลี่ยนจาก 'navigator' เป็น 'navigate'
        } else {
          alert("ลงทะเบียนไม่สําเร็จ กรุณาลองใหม่อีกครั้ง");
        }
      } catch (error) {
        alert("พบข้อผิดพลาด", error);
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
      {/* Register Form Container */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          pr: { xs: 12, sm: 6, md: 35, }
        }}
      >
        {/* กล่องรูปภาพ */}
        <Box
          onClick={handleBoxClick}
          sx={{
            marginLeft: 40,
            width: 400,
            height: 400,
            backgroundColor: '#f1efec',
            borderRadius: 20,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {userImage ? (
            <img
              src={URL.createObjectURL(userImage)}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <PersonAddAltIcon sx={{ fontSize: 350, color: '#999',  }} />
          )}
        </Box>

        {/* input file ซ่อน */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleSelectFileChange}
        />
        <Box sx={{ flexGrow: 1 }}>
          {/* Register Card */}
          <Box
            sx={{
              height: 700,
              backgroundColor: '#f1efec',
              borderRadius: 10,
              p: { xs: 3, sm: 5 },
              width: 570,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              marginLeft: 'auto', // Helps with right alignment
            }}
          >
            <Stack spacing={3} alignItems="center">
              {/* Header */}
              <Box display="flex" flexDirection="row">
                <img src="logo.png" width={50} />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 'bold',
                    color: '#030303',
                    textAlign: 'center',
                  }}
                >
                  สมัครสมาชิก
                </Typography>
              </Box>

              {/* Email Field */}
              <Box sx={{ width: '105%' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: '500',
                    marginBottom: '3px',
                    color: '#030303'
                  }}
                >
                  อีเมล
                </Typography>
                <TextField
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '26px',
                    },
                    '& fieldset': {
                      borderColor: '#000000', // สีขอบปกติ
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000', // ตอน hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000', // ตอน focus
                    },
                  }}
                />
              </Box>

              {/* Username Field */}
              <Box sx={{ width: '105%' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: '500',
                    marginBottom: '3px',
                    color: '#030303'
                  }}
                >
                  ชื่อผู้ใช้งาน
                </Typography>
                <TextField
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '26px',
                    },
                    '& fieldset': {
                      borderColor: '#000000', // สีขอบปกติ
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000', // ตอน hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000', // ตอน focus
                    },
                  }}
                />
              </Box>

              {/* Password Field */}
              <Box sx={{ width: '105%' }}>
                <Typography
                  variant="subtitle1"
                  type={showPassword ? 'text' : 'password'}
                  sx={{
                    fontWeight: '500',
                    marginBottom: '3px',
                    color: '#030303'
                  }}
                >
                  รหัสผ่าน
                </Typography>
                <TextField
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '26px',
                    },
                    '& fieldset': {
                      borderColor: '#000000', // สีขอบปกติ
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000', // ตอน hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000', // ตอน focus
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end"
                        sx={{ color: '#123458', mr: 0.5,'&:hover': {
                          color: '#1a6d92',
                          } }}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Confirm Password Field */}
              <Box sx={{ width: '105%' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: '500',
                    marginBottom: '3px',
                    color: '#030303'
                  }}
                >
                  ยืนยันรหัสผ่าน
                </Typography>
                <TextField
                  value={userConfirmPassword}
                  onChange={(e) => setUserConfirmPassword(e.target.value)}
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '26px',
                    },
                    '& fieldset': {
                      borderColor: '#000000', // สีขอบปกติ
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000', // ตอน hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000', // ตอน focus
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPassword} edge="end"
                        sx={{ color: '#123458', mr: 0.5,'&:hover': {
                          color: '#1a6d92',
                          } }}>
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Login Button */}
              <Button
                onClick={handleRegisterClick}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 2,
                  width: '105%',
                  fontWeight: 'bold',
                  backgroundColor: '#123458',
                  '&:hover': {
                    backgroundColor: '#1a6d92',
                  },
                  borderRadius: '26px',
                }}
              >
                สมัครสมาชิก
              </Button>

              {/* Register Link */}
              <Typography variant="body2" sx={{ mt: 0, color: '#000000' }}>
                เป็นสมาชิกอยู่แล้ว?{' '}
                <Button
                  onClick={() => navigate('/login')}
                  color="primary"
                  size="small"
                  sx={{
                    fontWeight: 'bold',
                    color: '#123458',
                    textTransform: 'none',
                    p: 0,
                    minWidth: 0,
                    '&:hover': {
                  color: '#1a6d92',
                  }
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default RegisterUI