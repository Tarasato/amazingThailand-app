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
  Pagination,
  InputBase,
  Paper,
  ButtonBase,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import NotificationPopup from './NotificationPopup';
import ThaiBG from './../assets/BG.png'; //พื้นหลัง
import axios from 'axios'; // อย่าลืม import axios

const API_URL = import.meta.env.VITE_API;

function HomeUI() {
  const [showNotification, setShowNotification] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // สถานะการโหลดข้อมูล

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const filteredPlaces = places.filter(place =>
    place.placeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentPlaces = filteredPlaces.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const [AvatarHover, setAvatarHover] = useState(false);
  const [LogoutHover, setLogoutHover] = useState(false);


  const handleNotificationConfirm = () => {
    console.log("ตกลง");
    setShowNotification(false);
    navigate("/login");
  };

  const handleNotificationCancel = () => {
    console.log("ยกเลิก");
    setShowNotification(false);
  };

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserName(user.userName);
      setUserImage(user.userImage);
    }
    // ดึงข้อมูลสถานที่จาก API
    const getAllPlace = async () => {
      try {
        const resData = await axios.get(`${API_URL}/place/all`); // ✅ ไม่มี userId
        if (resData.status === 200) {
          setPlaces(resData.data["data"]);
          setIsLoading(false); // ตั้งสถานะการโหลดเป็น false เมื่อข้อมูลโหลดเสร็จ
        } else {
          console.error("Failed to fetch places:", resData);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setIsLoading(false); // ตั้งสถานะการโหลดเป็น false เมื่อข้อมูลโหลดเสร็จ
      }
    };

    getAllPlace();

  }, []);

  return (
    <>
      {/* =========================== AppBar ======================== */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#123458', boxShadow: 'none' }}>
          <Toolbar sx={{ width: "100%" }}>
            {/* logo button */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => navigate("/")}
            >
              <img src='logo.png' width={40} alt="logo" />
            </IconButton>
            <Button onClick={() => navigate("/")}>
              <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                Amazing Thailand
              </Typography>
            </Button>


            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 500,
                  borderRadius: 10,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="ค้นหารูปภาพสถานที่"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton disabled sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon color="action" />
                </IconButton>
              </Paper>
            </Box>

            {/* user profile / login / logout */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {userName ? (
                <>
                  <Typography variant="h7" component="div" sx={{ color: 'white', mr: 2 }}>
                    {userName}
                  </Typography>
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
                    sx={{ ml: 2, border: LogoutHover ? '2px solid #1a6d92' : 'none' }}
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
                <Button color="inherit" sx={{ ml: 2 }} onClick={() => navigate("/login")}>
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
      {/* Notification */}
      {showNotification && (
        <NotificationPopup
          title="จำเป็นต้องเข้าสู่ระบบเพื่ออัปโหลดรูปภาพ"
          message="คุณต้องการเข้าสู่ระบบเพื่ออัปโหลดรูปภาพหรือไม่?"
          onConfirm={handleNotificationConfirm}
          onCancel={handleNotificationCancel}
        />
      )}
      <Stack sx={{ padding: 4, direction: 'row' }}>
        <Grid container spacing={4}>
          {isLoading ? ( // แสดงไอคอนกำลังโหลดเมื่อยังไม่โหลดข้อมูล
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            </Grid>
          ) : (
            currentPlaces.map((place, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={place.placeId || index}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    height: 250,
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover .hover-overlay': {
                      opacity: 1,
                    },
                  }}
                >
                  <Button
                    onClick={() => navigate(`/post/${place.placeId}`)}  // ส่ง placeId ผ่าน URL
                    sx={{ padding: 0, height: '100%', width: '100%' }}
                  >
                    <img
                      src={place.placeImage}
                      alt={place.placeName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <Box
                      className="hover-overlay"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        height: '100%',
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        py: 1,
                        opacity: 0,
                        transition: 'opacity 0.15s ease-in-out',
                        pointerEvents: 'none',
                      }}
                    >
                      <Typography variant="h6" noWrap>
                        {place.placeName}
                      </Typography>
                    </Box>
                  </Button>

                </Box>
              </Grid>
            ))
          )}
        </Grid>





        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, width: '100%' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                backgroundColor: '#123458',
                color: 'white',
              },
            }}
          />
        </Box>

      </Stack>
      {/* Floating Upload Button */}

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 30,
          backgroundColor: '#123458',
          color: 'white',
          width: 70,
          height: 70,
          '&:hover': { backgroundColor: '#1a6d92' },
        }}
        onClick={() => userName ? navigate("/addpost") : setShowNotification(true)}
      >
        <AddPhotoAlternateIcon fontSize='large' />
      </IconButton>
    </>
  );
}

export default HomeUI;
