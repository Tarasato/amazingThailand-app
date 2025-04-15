import { React, useState, useEffect, useRef } from 'react';
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
import NotificationPopup from './NotificationPopup';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API;

function AddPostUI() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [placeImage, setPlaceImage] = useState(null);
  const [placeName, setPlaceName] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const [AvatarHover, setAvatarHover] = useState(false);
  const [LogoutHover, setLogoutHover] = useState(false);


  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // สั่งให้ input ทำงาน
    }
  };
  // เมื่อเลือกไฟล์
  const handleSelectFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlaceImage(file);
      console.log('Selected file:', file);
    }
  };

  const handleSubmit = async () => {
    if (!placeName || !placeImage) {
      alert("กรุณากรอกชื่อสถานที่และเลือกรูปภาพ");
      return;
    }

    // Create form data to send to the backend
    const formData = new FormData();
    formData.append("userId", JSON.parse(localStorage.getItem("user")).userId);
    formData.append("placeName", placeName);
    formData.append("placeImage", placeImage);

    try {
      // Use axios to send the form da
      const response = await axios.post(`${API_URL}/place`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      if (response.status === 201) {
        alert("โพสต์ถูกสร้างเรียบร้อยแล้ว");
        console.log("Post created successfully, PlaceId:", response.data.data.placeId);
        navigate(-1); 
      } else {
        alert("เกิดข้อผิดพลาดในการสร้างโพสต์");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.userName);
      setUserImage(user.userImage);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      {/* =========================== AppBar ======================== */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#123458', boxShadow: 'none', }}>
          <Toolbar sx={{ width: "100%" }}>
            {/* logo button */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => {
                navigate("/");
              }}
            >
              <img src='logo.png' width={40} alt="logo" />
            </IconButton>
            <Button onClick={() => {

              navigate("/");
            }}>
              <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                Amazing Thailand
              </Typography>
            </Button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              {/* Username */}
              {userName ? (
                <>
                  <Typography variant="h7" component="div" sx={{ color: 'white' }}>
                    {userName}
                  </Typography>
                  {/* Avatar */}
                  <IconButton
                    onClick={() => navigate("/myprofile")}
                    onMouseEnter={() => setAvatarHover(true)}
                    onMouseLeave={() => setAvatarHover(false)}

                  ><img
                      src={userImage ? userImage : Profile}
                      alt="user"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',

                        border: AvatarHover ? '2px solid #1a6d92' : 'none',
                      }}
                    /></IconButton>

                  <Button
                    color="inherit"
                    sx={{ border: LogoutHover ? '2px solid #1a6d92' : 'none' }}
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                    onMouseEnter={() => setLogoutHover(true)}
                    onMouseLeave={() => setLogoutHover(false)}

                  >
                    ออกจากระบบ
                  </Button>
                </>
              ) : (
                <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={() => navigate("/login")}>
                  เข้าสู่ระบบ
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box >

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
        height="100%"
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
              cursor: 'pointer',
              overflow: 'hidden',
            }}
            onClick={handleBoxClick}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleSelectFileChange}
            />
            {placeImage ? (
              <img
                src={URL.createObjectURL(placeImage)}
                alt="Selected"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px',
                }}
              />
            ) : (
              <Typography sx={{ fontSize: 300, color: '#ccc' }}>+</Typography>
            )}
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
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}

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
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                mt: 3,
                fontWeight: 'bold',
                fontSize: '20px',
                backgroundColor: '#123458',
                borderRadius: '30px',
                '&:hover': {
                  backgroundColor: '#1a6d92',
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
