import React from 'react';
import { Box, Typography, Button, Avatar, IconButton, InputBase, Paper, Grid , TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate ,useState ,useEffect} from 'react-router-dom';
import ThaiBG from './../assets/BG.png';
import ProfileImage from './../assets/profile.png';
import Profile from './../assets/profile.png';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const API_URL = import.meta.env.VITE_API;

const MyProfileUI = () => {
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
      </Box >

      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        {/* BG Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
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
              filter: 'brightness(0.5)',
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          {/* Profile */}
          <Avatar
            src={ProfileImage}
            sx={{ width: 120, height: 120, border: '4px solid white' }}
          />

          <Button
            onClick={() => navigate('/edit-profile')}
            variant="contained"
            sx={{
              borderRadius: 10,
              px: 4,
              py: 1,
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              mb: 4,
            }}
          >
            แก้ไขโปรไฟล์
          </Button>

          {/* Search */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 300,
              borderRadius: 5,
              mb: 3,
            }}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="ค้นหารูปของฉัน" />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* My Photos Section */}
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            รูปของฉัน
          </Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={5} sm={4} md={2} key={index}>
                <Box
                  sx={{
                    width: '100%',
                    paddingTop: '100%',
                    backgroundColor: '#ffffff90',
                    borderRadius: 3,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Floating Upload Button */}
        <IconButton
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: '#0f1c59',
            color: 'white',
            width: 56,
            height: 56,
            '&:hover': { backgroundColor: '#1a2d72' },
          }}
        />
      </Box>
    </>
  );
};

export default MyProfileUI;
