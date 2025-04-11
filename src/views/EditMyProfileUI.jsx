import React, { useState, useRef, useEffect } from 'react';
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
import { useNavigate, useParams } from "react-router-dom";
import BG from './../assets/BG.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API;

function EditProfileUI() {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [originalUserData, setOriginalUserData] = useState({
    userName: "",
    userEmail: "",
    userImage: null,
  });


  useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserName(user.userName || ""); // Default to empty string if undefined
      setUserImage(user.userImage || null); // Default to null if no image
      setUserId(user.userId || "");
      setUserEmail(user.userEmail || ""); // Default to empty string if undefined
      setUserPassword(user.userPassword || ""); // Default to empty string if undefined

      setOriginalUserData({
        userName: user.userName || "",
        userEmail: user.userEmail || "",
        userImage: user.userImage || null,
      });

    }
  }, []);

  const handleCancel = () => {
    setUserName(originalUserData.userName);
    setUserEmail(originalUserData.userEmail);
    setUserImage(originalUserData.userImage);
  };


  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (userName.trim().length === 0) {
      alert("ป้อนชื่อผู้ใช้งานด้วย");
    } else if (userEmail.trim().length === 0) {
      alert("ป้อนอีเมล์ด้วย");
    } else {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("userEmail", userEmail);
      formData.append("userPassword", userPassword); // <-- ส่งค่าเดิมคืนไป

      if (userImage && userImage instanceof File) {
        formData.append("userImage", userImage);
      }

      try {
        const response = await axios.put(
          `${API_URL}/user/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          const updatedUser = response.data.data;
          localStorage.setItem("user", JSON.stringify(updatedUser));
          navigate("/myprofile");

          alert("ข้อมูลถูกบันทึกเรียบร้อย");
          navigate("/myprofile");
        } else {
          alert("ไม่สามารถบันทึกข้อมูลได้");
        }
      } catch (error) {
        console.error("Error saving user data:", error);
        alert("พบข้อผิดพลาด");
      }
    }
  };


  return (
    <>
      <CssBaseline />
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

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          pr: { xs: 12, sm: 6, md: 35 },
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
            userImage instanceof File ? (
              <img
                src={URL.createObjectURL(userImage)}  // ใช้ URL.createObjectURL เพื่อสร้าง URL จากไฟล์ที่ผู้ใช้เลือก
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <img
                src={userImage}  // แสดงรูปจาก URL หรือจาก `userImage` ถ้าเป็น URL
                alt="User Image"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )
          ) : (
            <PersonAddAltIcon sx={{ fontSize: 350, color: '#999' }} />  // แสดงไอคอนถ้ายังไม่มีรูป
          )}
        </Box>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleSelectFileChange}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              height: 700,
              backgroundColor: '#f1efec',
              borderRadius: 10,
              p: { xs: 3, sm: 6 },
              width: 550,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              marginLeft: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative', 
            }}
          >
            
            <Box sx={{
              position: 'absolute',
              top: 20,
              right: 30,
              cursor: 'pointer',
            }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold' }}
                onClick={() => navigate('/myprofile')}
              >
                X
              </Typography>
            </Box>

            <Stack spacing={4} alignItems="center">
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
                  แก้ไขข้อมูลสมาชิก
                </Typography>
              </Box>

              <Box sx={{ width: '105%' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: '500',
                    marginBottom: '4px',
                    color: '#030303',
                  }}
                >
                  อีเมล
                </Typography>
                <TextField
                  type="email"
                  value={userEmail || ""}
                  onChange={(e) => setUserEmail(e.target.value)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '26px',
                    },
                    '& fieldset': {
                      borderColor: '#000000',
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000',
                    },
                  }}
                />
              </Box>

              <Box sx={{ width: '105%' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: '500',
                    marginBottom: '4px',
                    color: '#030303',
                  }}
                >
                  ชื่อผู้ใช้งาน
                </Typography>
                <TextField
                  value={userName || ""}
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '26px',
                    },
                    '& fieldset': {
                      borderColor: '#000000',
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000',
                    },
                  }}
                />
              </Box>

              <Button
                onClick={handleSaveChanges}
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
                บันทึกข้อมูล
              </Button>
              <Button
                onClick={handleCancel}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 2,
                  width: '105%',
                  fontWeight: 'bold',
                  backgroundColor: '#123458',
                  '&:hover': {
                    backgroundColor: '#FF1600',
                  },
                  borderRadius: '26px',
                }}
              >
                ยกเลิก
              </Button>
            </Stack>
          </Box>
        </Box>

      </Box>
    </>
  );
}

export default EditProfileUI;
