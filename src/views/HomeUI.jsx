import { React, useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Button,
  Stack,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ThaiBG from './../assets/BG.png'; //พื้นหลัง
import axios from 'axios'; // อย่าลืม import axios

const API_URL = import.meta.env.VITE_API;

function HomeUI() {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserName(user.userName);
      setUserImage(user.userImage);

      // ดึงข้อมูลสถานที่จาก API
      const getAllPlace = async () => {
        try {
          // ตรวจสอบว่า userId มีค่าหรือไม่
          const user = JSON.parse(localStorage.getItem('user'));
          if (!user || !user.userId) {
            console.error("User is not logged in or userId is missing.");
            return;
          }
      
          // ดึงข้อมูลจาก API
          const resData = await axios.get(`${API_URL}/place/${user.userId}`);
      
          // ตรวจสอบผลลัพธ์จาก API
          if (resData.status === 200) {
            setPlaces(resData.data["data"]);
          } else {
            console.error("Failed to fetch places:", resData);
          }
        } catch (error) {
          // จัดการกับข้อผิดพลาดที่เกิดขึ้น
          console.error("Error fetching places:", error);
        }
      };
      

      getAllPlace();
    }
  }, []);

  return (
    <>
      {/* =========================== AppBar ======================== */}
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: '#123458', boxShadow: 'none', }}>
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
              <Typography variant="h7" component="div" sx={{ color: 'white' }}>
                Amazing Thailand
              </Typography>
            </Button>
            {/* Search TextField */}
            <TextField
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
                border: '1px solid white',
                '&:hover': {
                  border: '1px solid rgba(255, 255, 255, 0.8)'
                },
              }}
            >
              <SearchIcon sx={{ color: 'white' }} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              {userName ? (
                <>

                  <Typography variant="h7" component="div" sx={{ color: 'white' }}>
                    {userName}
                  </Typography>
                  <IconButton 
                    onClick={() => navigate("/myprofile")}
                  ><img
                    src={userImage}
                    alt="user"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  /></IconButton>

                  <Button
                    color="inherit"
                    sx={{ marginLeft: 'auto' }}
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
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
      <Stack sx={{ padding: 4, direction: 'row' }}>
        <Grid container spacing={10}>
          {[...Array(15)].map((_, index) => (
            <Grid item xs={15} sm={6} md={10} lg={2.4} key={index}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  height: 200,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Stack direction="row" spacing={1}>
            {['<<', '<', '1', '2', '3', '...', '7', '>', '>>'].map((item, i) => (
              <Button key={i} variant="contained" sx={{ backgroundColor: '#123458' }}>
                {item}
              </Button>
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default HomeUI;
