import React, { useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ThaiBG from './../assets/BG.png'; // พื้นหลัง
import ProfileImage from './../assets/profile.png'; // รูปโปรไฟล์

const API_URL = import.meta.env.VITE_API;

function EditProfileUI() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState('somruethai254701@mail.com');
  const [username, setUsername] = useState('สมฤทัย');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('123456');

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }
    // ทำการส่งข้อมูลไป backend ตรงนี้
    console.log({ email, username, password });
  };

  return (
    <>
      <CssBaseline />
      {/* พื้นหลัง */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
      >
        <img
          src={ThaiBG}
          alt="background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)'
          }}
        />
      </Box>

      {/* Layout */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          px: 2,
        }}
      >
        {/* ปุ่มย้อนกลับ */}
        
        {/* <IconButton
          onClick={color="inherit" () => navigate("/myprofile")}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: 'white',
          }}
        >
          // <ArrowBackIosNewIcon />
        </IconButton> */}

        {/* รูปโปรไฟล์ */}
        <Box
          sx={{
            mr: { xs: 0, md: 5 },
            display: { xs: 'none', md: 'block' },
          }}
        >
          <img
            src={ProfileImage}
            alt="Profile"
            style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '5px solid white',
            }}
          />
        </Box>

        {/* ฟอร์มแก้ไข */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 5,
            p: 4,
            width: 400,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold" align="center">
              แก้ไขข้อมูลสมาชิก
            </Typography>

            <TextField
              label="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              InputProps={{ style: { borderRadius: 20 } }}
            />
            <TextField
              label="ชื่อผู้ใช้งาน"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              InputProps={{ style: { borderRadius: 20 } }}
            />
            <TextField
              label="รหัสผ่าน"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                style: { borderRadius: 20 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="ยืนยันรหัสผ่าน"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              InputProps={{
                style: { borderRadius: 20 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPassword} edge="end">
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                borderRadius: 20,
                fontWeight: 'bold',
                py: 1.5,
                backgroundColor: '#002e5f',
                '&:hover': { backgroundColor: '#1c3d6e' },
              }}
            >
              บันทึก
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default EditProfileUI;
