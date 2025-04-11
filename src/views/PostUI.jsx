//rfce
import { React, useState, useEffect, useRef } from 'react';
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
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import BG from './../assets/BG.png'; // background
import logo from '../assets/logo.png';  
import Profile from '../assets/profile.png';

const API_URL = import.meta.env.VITE_API;

function PostUI() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userImage, setUserImage] = useState('');
  const { placeId } = useParams();
  const [placeName, setPlaceName] = useState('');
  const [placeImage, setPlaceImage] = useState('');
  const [newPlaceImage, setNewPlaceImage] = useState(null);
  const [placeData, setPlaceData] = useState([]);

  const [AvatarHover, setAvatarHover] = useState(false);
  const [LogoutHover, setLogoutHover] = useState(false);

  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    if (userId != placeData.userId) {
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPlaceImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!placeImage) {
      alert("กรุณาเลือกรูปภาพ");
      return;
    } else if (!placeName) {
      alert("กรุณากรอกชื่อสถานที่");
      return;
    }

    const formData = new FormData();
    formData.append("userId", JSON.parse(localStorage.getItem("user")).userId);
    formData.append("placeName", placeName);
    newPlaceImage ? formData.append("placeImage", newPlaceImage) : null;

    try {
      const response = await axios.put(`${API_URL}/place`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        alert("โพสต์ถูกสร้างเรียบร้อยแล้ว");
        navigate("/post");
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
      setUserId(user.userId);
      console.log(`User ID: ${user.userId}`);
    }

    const getPlace = async () => {
      try {
        const response = await axios.get(`${API_URL}/place/one/${placeId}`);
        if (response.status === 200) {
          localStorage.setItem("place", JSON.stringify(response.data["data"]));
        } else {
          console.error("Failed to fetch places:", response);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    getPlace();

    const place = JSON.parse(localStorage.getItem("place"));
    if (place) {
      setPlaceName(place.placeName);
      setPlaceImage(place.placeImage);
      setPlaceData(place);

      console.log(`User Place ID: ${place.userId}`);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      {/* AppBar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#123458', boxShadow: 'none' }}>
          <Toolbar sx={{ width: "100%" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => navigate("/")}
            >
              <img src={logo} width={40} alt="logo" />
            </IconButton>
            <Button onClick={() => navigate("/")}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Amazing Thailand
              </Typography>
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              {userName ? (
                <>
                  <Typography variant="h7" sx={{ color: 'white' }}>{userName}</Typography>
                  <IconButton
                    onClick={() => navigate("/myprofile")}
                    onMouseEnter={() => setAvatarHover(true)}
                    onMouseLeave={() => setAvatarHover(false)}
                  >
                    <img
                      src={userImage ? userImage : Profile}
                      alt="user"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: AvatarHover ? '2px solid #1a6d92' : 'none',
                      }}
                    />
                  </IconButton>
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
      </Box>

      {/* Background */}
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

      {/* Content */}
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ paddingTop: 8 }}
      >
        {/* Upload + Form */}
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="60%"
          sx={{ display: 'flex', gap: 5 }}
        >
          {/* Left Box */}
          <Box
            sx={{
              marginTop: -2.5,
              marginLeft: -35,
              width: 800,
              height: 800,
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

          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleSelectFileChange}
            />
            {/* รูป */}
            {placeImage ? (
              <img
                src={placeImage}
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
        </Box>
      </Box>

      {/* กล่องรายละเอียดด้านขวา */}
      <Box
        sx={{
          position: 'absolute',
          marginTop: -100,
          right: 120,
          width: 600,
          height: 800,
          backgroundColor: 'white',
          borderRadius: '30px',
          boxShadow: 5,
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <Typography
            variant="h5"
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => navigate(-1)}
          >
            X
          </Typography>
        </Box>


        {/* ผู้โพสต์ */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <img
            src={Profile}
            alt="user icon"
            style={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography fontWeight="bold">คิม สมสุข</Typography>
            <Typography fontSize={14}>99 มกราคม พ.ศ. 2555</Typography>
          </Box>
        </Box>

        {/* ชื่อสถานที่ */}
        <Typography fontWeight="bold" fontSize={20} mb={2}>
          {placeName}
        </Typography>

        {/* ความคิดเห็น */}
        <Box>
          <Typography fontWeight="bold" fontSize={16} mb={1}>
            ความคิดเห็น
          </Typography>
          <Box
            sx={{
              border: '1px solid gray',
              borderRadius: 2,
              p: 1,
              maxHeight: 150,
              overflowY: 'auto',
            }}
          >
            {/* คอมเมนต์ตัวอย่าง */}
            <Box display="flex" alignItems="center" mb={1}>
              <img
                src={Profile}
                alt="icon"
                style={{ width: 30, height: 30 }}
              />
              <Box ml={1}>
                <Typography fontWeight="bold" fontSize={14}>สมชาย</Typography>
                <Typography fontSize={14}>nice</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <img
                src={Profile}
                alt="icon"
                style={{ width: 30, height: 30 }}
              />
              <Box ml={1}>
                <Typography fontWeight="bold" fontSize={14}>สมศรี</Typography>
                <Typography fontSize={14}>wow</Typography>
              </Box>
            </Box>
          </Box>

          {/* ปุ่มเข้าสู่ระบบ */}
          {
            userName ?
              null
              : <Box display="flex" justifyContent="center" flexDirection={"row"}>
                <Typography
                  color="#42a5f4"
                  fontWeight="bold"
                  mt={2}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >
                  เข้าสู่ระบบ
                </Typography>
                <Typography
                  color="#000000"
                  fontWeight="bold"
                  mt={2}
                  ml={1}
                  sx={{ cursor: 'default' }}
                >
                  เพื่อแสดงความคิดเห็น
                </Typography>
              </Box>

          }
        </Box>
      </Box>

    </>
  );
}

export default PostUI;
