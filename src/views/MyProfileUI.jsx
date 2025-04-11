import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Avatar, IconButton, InputBase, Paper, Grid, TextField, AppBar, Toolbar, Pagination, Stack, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ThaiBG from './../assets/BG.png';
import Profile from './../assets/profile.png';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import NotificationPopup from './NotificationPopup';

const API_URL = import.meta.env.VITE_API;

const MyProfileUI = () => {
  const [showNotification, setShowNotification] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [userId, setUserId] = useState('');
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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

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
      setUserId(user.userId);
      setCreatedAt(user.createdAt);
    }

    // ดึงข้อมูลสถานที่จาก API
    const getAllPlace = async () => {
      try {
        const resData = await axios.get(`${API_URL}/place/all/${user.userId}`);
        if (resData.status === 200) {
          setPlaces(resData.data["data"]);
          setIsLoading(false); // ตั้งสถานะการโหลดเป็น false เมื่อข้อมูลโหลดเสร็จ
        } else {
          console.error("Failed to fetch places:", resData);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setIsLoading(false); // ตั้งสถานะการโหลดเป็น false ในกรณีที่เกิดข้อผิดพลาด
      }
    };

    getAllPlace();

  }, []);

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <NotificationPopup
          title="จำเป็นต้องเข้าสู่ระบบเพื่ออัปโหลดรูปภาพ"
          message="คุณต้องการเข้าสู่ระบบเพื่ออัปโหลดรูปภาพหรือไม่?"
          onConfirm={handleNotificationConfirm}
          onCancel={handleNotificationCancel}
        />
      )}
      {/* ================= AppBar ================= */}
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
              {userName ? (
                <>
                  <Typography variant="h7" component="div" sx={{ color: 'white' }}>
                    {userName}
                  </Typography>
                  <IconButton
                    onClick={() => navigate("/myprofile")}
                  >
                    <img
                      src={userImage ? userImage : Profile}
                      alt="user"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                      }}
                    />
                  </IconButton>

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

      <Box sx={{ position: 'relative', width: '100%', minHeight: '93.2vh', overflow: 'hidden' }}>
        {/* BG Image */}
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

        {/* Content */}
        <Box sx={{ display: 'flex-start', flexDirection: 'column', alignItems: 'center', mt: 4, mx: 4 }}>
          {/* Profile */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 4 }}>
            {/* Profile Section */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mx: 4 }}>
              <Avatar
                src={userImage ? userImage : Profile}
                sx={{ width: 200, height: 200, border: '3px solid white', mr: 3 }}
              />
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h4" sx={{ color: 'white', textAlign: 'left' }}>
                  {userName} {/* แสดงชื่อผู้ใช้ */}
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'left' }}>
                  {createdAt && !isNaN(new Date(createdAt)) ? `เป็นสมาชิกตั้งแต่ : ${formatDate(createdAt)}` : ''}
                </Typography>
                <Button
                  onClick={() => navigate('/editmyprofile')}
                  variant="contained"
                  sx={{
                    mt: 2, // margin-top for spacing
                    borderRadius: 10,
                    px: 4,
                    py: 1,
                    fontWeight: 'bold',
                    backgroundColor: '#123458',
                    '&:hover': { backgroundColor: '#1a6d92' },
                  }}
                >
                  แก้ไขโปรไฟล์
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Search and My Photos Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', mt: 4, ml: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
              รูปภาพของฉัน
            </Typography>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                width: 300,
                borderRadius: 10,
                mb: 3,
                mr: 4,
              }}
            >
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="ค้นหารูปของฉัน" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton disabled sx={{ p: '10px' }} aria-label="search" >
                <SearchIcon color="action" />
              </IconButton>
            </Paper>
          </Box>

          <Stack sx={{ padding: 4, direction: 'row' }}>
            <Grid container spacing={4}>
              {isLoading ? ( // แสดงไอคอนกำลังโหลดเมื่อยังไม่โหลดข้อมูล
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                </Grid>
              ) : filteredPlaces.length === 0 ? (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center" sx={{ color: 'white', mt: 4 }}>
                    ไม่พบสถานที่ที่คุณค้นหา
                  </Typography>
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
                        onClick={() => navigate(`/post/${place.placeId}`)}
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
        </Box>

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
          onClick={() => userName != '' ? navigate("/addpost") : setShowNotification(true)}
        >
          <AddPhotoAlternateIcon fontSize='large' />
        </IconButton>
      </Box>
    </>
  );
};

export default MyProfileUI;
