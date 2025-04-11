//rfce
import React, { useState, useRef } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import BG from './../assets/BG.png'; //background
import NotificationPopup from './NotificationPopup';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const API_URL = import.meta.env.VITE_API;

function EditPostUI() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const placeId = JSON.parse(localStorage.getItem("place")).placeId;

  const [placeName, setPlaceName] = useState('');
  const [placeImage, setPlaceImage] = useState(null)
  const [newPlaceImage, setNewPlaceImage] = useState(null)
  const fileInputRef = useRef(); // <- สำคัญ

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // สั่งให้ input ทำงาน
    }
  };
  // เมื่อเลือกไฟล์
  const handleSelectFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPlaceImage(file);
      console.log('Selected file:', file);
    }
  };

  const handleEditPostClick = async (e) => {
    console.log(placeName, placeImage);
    //Validate EditPost Button
    e.preventDefault();
    if (placeName.trim().length == 0) {
      alert("ป้อนชื่อสถานที่ด้วย");
    } else if (placeImage == null) {
      alert("เลือกรูปภาพด้วย")
    } else {
      //ส่งข้อมูลไปให้ API บันทึงลง DB แล้ว redirect ไปหน้า Login
      const formData = new FormData();

      formData.append("placeName", placeName);
      formData.append("placeImage", placeImage);
      formData.append("userId", userId);
      formData.append("placeId", placeId);

      if (newPlaceImage) {
        formData.append("placeImage", newPlaceImage);
      }

      try {
        const response = await axios.put(
          `${API_URL}user/`,
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
      {/* =========================== AppBar ======================== */}
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: '#123458', boxShadow: 'none', }} >

          <Toolbar sx={{ width: "100%" }}>
            {/* logo button */}
            <IconButton
              onClick={() => navigate("/login")}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <img src='logo.png' width={40} alt="logo" />
            </IconButton>
            <Button>
              <Typography variant="h7" component="div" sx={{ color: 'white', fontSize: '18px' }}>
                Amazing Thailand
              </Typography>
            </Button>
            {/* Search TextField */}
            <TextField
              value={placeName} onChange={(e) => setPlaceName(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '26px',
                  borderColor: 'black',
                  backgroundColor: 'white',
                },
                width: '40%',
                marginLeft: 20,
                marginRight: 1,
              }}
            />
            {/* Search Button */}
            <IconButton
              sx={{
                border: '1px solid white', // Correct way to set border
                '&:hover': {
                  border: '1px solid rgba(255, 255, 255, 0.8)' // Optional: hover effect
                },

              }}
            >
              <SearchIcon sx={{ color: 'white' }} />
            </IconButton>

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
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff', marginTop: 5, fontSize: 30, fontWeight: 'bold' }}>
          แก้ไขข้อมูลรูปภาพ
        </Box>
        <Box display={"flex"} flexDirection={"row"}>
          <Box
            onClick={handleBoxClick}
            sx={{
              marginTop: 10,
              marginLeft: 20,
              width: 500,
              height: 500,
              backgroundColor: '#f1efec',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}>
            {placeImage ? (
              <img
                src={URL.createObjectURL(placeImage)}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <AddPhotoAlternateIcon sx={{ fontSize: 300 }} />
            )}
          </Box>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleSelectFileChange}
          />
          <Box sx={{ marginLeft: 45, alignContent: 'center' }}>
            <Box sx={{ width: '125%' }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>
                ชื่อสถานที่
              </Typography>
              <TextField
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '26px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#000000', // ขอบปกติ
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000', // ขอบตอน hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000', // ขอบตอน focus
                    },
                  },
                  marginTop: 2,
                }}
              />
              <Button
                onClick={handleEditPostClick}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  marginTop: 2,
                  py: 2,
                  fontWeight: 'bold',
                  backgroundColor: '#123458',
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  },
                  borderRadius: '26px',
                }}
              >
                บันทึกการแก้ไข
              </Button>
            </Box>
          </Box>

        </Box>
      </Box>

    </>
  )
}

export default EditPostUI