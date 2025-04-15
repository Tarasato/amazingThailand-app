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
  Menu,
  MenuItem,
  Icon,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import BG from './../assets/BG.png'; // background
import logo from '../assets/logo.png';
import Profile from '../assets/profile.png';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


const API_URL = import.meta.env.VITE_API;

function PostUI() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userPlaceName, setUserPlaceName] = useState('');
  const [userId, setUserId] = useState('');
  const [userPlaceId, setUserPlaceId] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userPlaceImage, setUserPlaceImage] = useState('');
  const { placeId } = useParams();
  const [placeName, setPlaceName] = useState('');
  const [newPlaceName, setNewPlaceName] = useState('');

  const [placeImage, setPlaceImage] = useState('');
  const [newPlaceImage, setNewPlaceImage] = useState(null);
  const [createdAt, setCreatedAt] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);

  const [postEditmode, setPostEditmode] = useState(false);

  const [openMenu1Id, setOpenMenu1Id] = useState(null);

  const [AvatarHover, setAvatarHover] = useState(false);
  const [LogoutHover, setLogoutHover] = useState(false);

  const fileInputRef = useRef(null);
  // Post Menu===========================
  const [anchorPost, setAnchorPost] = useState(null);
  const open1 = Boolean(anchorPost);

  const handleImageBoxClick = () => {
    if (!postEditmode) {
      return
    }
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

  const handlePostClick = (event, id) => {
    setAnchorPost(event.currentTarget);
    setOpenMenu1Id(id);
  };

  const handlePostClose = () => {
    setAnchorPost(null);
    setOpenMenu1Id(null);
  };
  //แก้ไขโพสต์
  const handleEditPost = (placeId, placeImage, placeName) => {
    setPostEditmode(true);
    setPlaceImage(placeImage);  // ดึงข้อความคอมเมนต์มาแสดงในช่องกรอกความคิดเห็น
    setNewPlaceName(placeName);  // ดึงข้อความคอมเมนต์มาแสดงในช่องกรอกความคิดเห็น
    setOpenMenu1Id(null);  // ปิดเมนู
    // setEditPlaceId(placeId);  // ตั้งค่ารหัสความคิดเห็นที่กำลังจะแก้ไข
  };

  const handleEditPostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("placeId", placeId);
      formData.append("placeName", newPlaceName);
      newPlaceImage ? formData.append("placeImage", newPlaceImage) : null; // ส่งไฟล์ภาพ
      formData.append("userId", userId);

      const response = await axios.put(`${API_URL}/place/${placeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("แก้ไขโพสต์สําเร็จ");

        setPostEditmode(false); // ปิดโหมดแก้ไข
        (newPlaceImage) ? setPlaceImage(newPlaceImage) : setPlaceImage(placeImage); // ล้างรูปภาพใหม่
        setPlaceName(newPlaceName); // ตั้งชื่อสถานที่ใหม่
      } else {
        console.error("Failed to edit post:", response);
        alert("เกิดข้อผิดพลาดในการแก้ไขโพสต์");
      }
    } catch (error) {
      console.error("Error editing post:", error);
      if (error.response) {
        alert("แก้ไขโพสต์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      } else {
        alert("เกิดข้อผิดพลาดในการแก้ไขโพสต์ กรุณาลองใหม่อีกครั้ง");
        console.error("Error response:", error.response.data); // แสดงข้อมูลข้อผิดพลาดจากเซิร์ฟเวอร์
        console.error("Error status:", error.response.status); // แสดงสถานะ HTTP
        console.error("Error headers:", error.response.headers); // แสดง header ของการตอบกลับ
      }
    }

  }
  const handleDeletePost = async (placeId) => {
    handlePostClose();

    const confirmDelete = window.confirm("คุณแน่ใจหรือว่าต้องการลบโพสต์นี้?");
    if (!confirmDelete) {
      return; // ถ้ายกเลิกการลบ
    }

    try {
      const response = await axios.delete(`${API_URL}/place/${placeId}`);
      if (response.status === 200) {
        alert("ลบโพสต์สําเร็จ");
        navigate('/');
      } else {
        console.error("Failed to delete comment:", response);
        alert("เกิดข้อผิดพลาดในการลบโพสต์สําเร็จ");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("ลบโพสต์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  };

  // Comment Menu===============================
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event, commentId) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuId(null);
  };

  const handleDeleteComment = async (commentId) => {
    handleMenuClose();

    const confirmDelete = window.confirm("คุณแน่ใจหรือว่าต้องการลบความคิดเห็นนี้?");
    if (!confirmDelete) {
      return; // ถ้ายกเลิกการลบ
    }

    try {
      const response = await axios.delete(`${API_URL}/comment/${commentId}`);
      if (response.status === 200) {
        alert("ลบความคิดเห็นสำเร็จ");
        window.location.reload();
      } else {
        console.error("Failed to delete comment:", response);
        alert("เกิดข้อผิดพลาดในการลบความคิดเห็น");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("ลบความคิดเห็นไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleEditComment = (commentText, commentId) => {
    setComment(commentText);  // ดึงข้อความคอมเมนต์มาแสดงในช่องกรอกความคิดเห็น
    setOpenMenuId(null);  // ปิดเมนู
    setEditCommentId(commentId);  // ตั้งค่ารหัสความคิดเห็นที่กำลังจะแก้ไข

  };

  const dateFormat = (createdAt) => {

    const rawDate = createdAt; // วันที่ที่ได้จาก API
    const date = new Date(rawDate);

    // ดึงเวลาจาก UTC มาเป็นเวลาท้องถิ่น
    date.setHours(date.getHours());

    const day = date.getDate().toString().padStart(2, '0');
    const monthName = date.toLocaleString('th-TH', { month: 'long' });
    const year = date.getFullYear();  // ปี ค.ศ.

    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    // รูปแบบที่ต้องการ
    setCreatedAt(`${day} ${monthName} ${year} ${hour}:${minute}:${second}`);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.userName);
      setUserImage(user.userImage);
      setUserId(user.userId);
      //console.log(`User ID: ${user.userId}`);
    }
    setTimeout(100);

    const getPlace = async () => {
      try {
        const response = await axios.get(`${API_URL}/place/one/${placeId}`);
        if (response.status === 200) {
          localStorage.setItem("placeData", JSON.stringify(response.data["data"]));
        } else {
          console.error("Failed to fetch places:", response);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    getPlace();

    const place = JSON.parse(localStorage.getItem("placeData"));
    //console.log("JSON Place data:", place);
    if (place) {
      if (postEditmode == false) {
        setPlaceName(place.place.placeName);
      }

      setPlaceImage(place.place.placeImage);
      setUserPlaceId(place.place.userId);
      setUserPlaceName(place.user.userName);
      setUserPlaceImage(place.user.userImage);
      dateFormat(place.place.createdAt);
      console.log(`CreateAt: ${createdAt}`);
      console.log(`User Place Name: ${userPlaceName}`);
      console.log(`Place ID: ${place.place.placeId}`);
      console.log(`User Place ID: ${userPlaceId}`);
    }

    const getComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/comment/${placeId}`);
        if (response.status === 200) {
          localStorage.setItem("commentData", JSON.stringify(response.data["data"]));
          setComments(response.data["data"]);
          //console.log("Comments data:", comments);
        }
        else {
          console.error("Failed to fetch places:", response);
        }
      } catch (error) {
        console.error(`Error fetching places: ${error}`);
      }
    };
    setTimeout(100);
    getComments();
  }, [userPlaceId, placeImage, comments, createdAt, userPlaceName, userPlaceId]); //userPlaceId, placeImage, comments

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (userId === '') {
      alert("กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น");
    } else if (comment.trim().length === 0) {
      alert("กรุณากรอกความคิดเห็น");
    } else {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("placeId", placeId);
      formData.append("commentText", comment);

      try {
        if (editCommentId) {
          // ถ้ามีการแก้ไขความคิดเห็น
          formData.append("commentId", editCommentId);
          const response = await axios.put(
            `${API_URL}/comment/${editCommentId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 200) {
            alert("แก้ไขความคิดเห็นสำเร็จ");
            setComment('');  // ล้างช่องกรอกความคิดเห็น
            setEditCommentId(null);  // รีเซ็ตการแก้ไข
            window.location.reload();
          } else {
            alert("แก้ไขความคิดเห็นไม่สำเร็จ");
          }
        } else {
          // การเพิ่มความคิดเห็นใหม่
          const response = await axios.post(
            `${API_URL}/comment/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 201) {
            alert("แสดงความคิดเห็นสำเร็จ");

            window.location.reload();
          } else {
            alert("แสดงความคิดเห็นไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
          }
        }
      } catch (error) {
        alert("พบข้อผิดพลาด", error);
      }
    }
  };

  const handleClose = (e) => {
    setPostEditmode(false); // ปิดโหมดแก้ไข
    setNewPlaceImage(null); // ล้างรูปภาพใหม่
    setUserPlaceId(null); // รีเซ็ต userPlaceId
    setPlaceName(''); // รีเซ็ตชื่อสถานที่
    setNewPlaceName(''); // รีเซ็ตชื่อสถานที่ใหม่
    navigate(-1);
  }

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
            onClick={handleImageBoxClick}
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
              position: 'relative'  // << สำคัญ! เพื่อวางปุ่มขวาบน
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleSelectFileChange}
            />

            {/* ถ้ามี newPlaceImage แสดงปุ่ม Reset */}
            {newPlaceImage && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();  // ไม่ให้กล่องเปิดไฟล์
                  setNewPlaceImage(null);
                  fileInputRef.current.value = null;
                }}
              >
                <RestartAltIcon color="error" />
              </IconButton>
            )}

            {newPlaceImage ? (
              <img
                src={URL.createObjectURL(fileInputRef.current.files[0])}
                alt="Selected"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px',
                }}
              />
            ) : placeImage ? (
              <img
                src={placeImage}
                alt="placeImage"
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
        {/* Post Menu============================== */}
        <Box display="flex" justifyContent="space-between" flexDirection="row">
          <Box display="flex" sx={{ ml: 60 }}>
            {userId == userPlaceId ? <IconButton onClick={(e) => handlePostClick(e, placeId)} size="small">
              <MoreHorizOutlinedIcon />
            </IconButton> : null}
            <Menu
              anchorEl={anchorPost}
              open={openMenu1Id === placeId}
              onClose={handlePostClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => handleEditPost(placeId, placeImage, placeName)}>แก้ไข</MenuItem>
              <MenuItem onClick={() => handleDeletePost(placeId)}>ลบ</MenuItem>
            </Menu>
          </Box>

          <Box display="flex" >
            <Typography
              variant="h5"
              sx={{ cursor: 'pointer', fontWeight: 'bold' }}
              onClick={(e) => {
                handleClose(e);
              }}

            >
              X
            </Typography>
          </Box>
        </Box>


        {/* ผู้โพสต์ */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <img
            src={userPlaceImage ? userPlaceImage : Profile}
            alt="user icon"
            style={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography fontWeight="bold">{userPlaceName}</Typography>
            <Typography fontSize={14}>{createdAt}</Typography>
          </Box>
        </Box>

        {/* ชื่อสถานที่ */}
        {postEditmode ? <TextField value={newPlaceName} onChange={(e) => setNewPlaceName(e.target.value)} fontWeight="bold" fontSize={20} mb={2}>
        </TextField> : <Typography fontWeight="bold" fontSize={20} mb={2}>
          {placeName}</Typography>}

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
              minHeight: 150,
              overflowY: 'auto',
            }}
          >
            {comments.map((item) => (
              <Box
                key={item.commentId}
                width="100%"
                display="flex"
                alignItems="flex-start"
                flexDirection="row"
                mb={1}
              >
                {/* รูปผู้ใช้ */}
                <img
                  src={item.user.userImage}
                  alt="icon"
                  style={{ width: 50, height: 50, borderRadius: '50%' }}
                />

                {/* กล่องฝั่งขวา */}
                <Box ml={1} flex={1}>
                  {/* แถวบน: ชื่อ + ปุ่ม 3 จุด */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography fontWeight="bold" fontSize={14}>
                      {item.user.userName}
                    </Typography>

                    {userId == item.userId ? <IconButton onClick={(e) => handleMenuOpen(e, item.commentId)} size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton> : null}
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenuId === item.commentId}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={() => handleEditComment(item.commentText, item.commentId)}>แก้ไข</MenuItem>
                      <MenuItem onClick={() => handleDeleteComment(item.commentId)}>ลบ</MenuItem>
                    </Menu>
                  </Box>

                  {/* แถวล่าง: คอมเมนต์ */}
                  <Typography fontSize={14}>
                    {item.commentText}
                  </Typography>
                  {/* เส้นคั่น */}
                  <Divider sx={{ my: 1 }} />
                </Box>
              </Box>
            ))}
          </Box>

          {/* ปุ่มเข้าสู่ระบบ */}
          {
            userName ?
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  margin: '0 auto',
                  p: 2,
                  border: '1px solid gray',
                  borderRadius: 2,
                  mt: 2,
                }}
              >
                {editCommentId ?
                  <Typography variant="h6" mb={2}>บันทึกความคิดเห็น</Typography>
                  :
                  <Typography variant="h6" mb={2}>แสดงความคิดเห็น</Typography>
                }
                {/* กล่องแสดงความคิดเห็น */}
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                  value={comment}
                  onChange={handleCommentChange}
                  sx={{ mb: 2 }}
                />

                <Box display="flex" gap={2}>
                  {/* ปุ่มส่งความคิดเห็น */}
                  {editCommentId ?
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCommentSubmit}
                      disabled={!comment.trim()}
                    >แก้ไขความคิดเห็น</Button>
                    :
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCommentSubmit}
                      disabled={!comment.trim()}
                    >
                      ส่งความคิดเห็น
                    </Button>}
                  {/* ปุ่มยกเลิกการแก้ไข */}

                  {editCommentId ?
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setComment('');  // ล้างช่องกรอกความคิดเห็น
                        setEditCommentId(null);  // รีเซ็ตการแก้ไข
                      }}
                    >
                      ยกเลิกการแก้ไข
                    </Button>
                    : null}
                </Box>
              </Box>
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

        {postEditmode ?
          <Box display="flex" justifyContent="space-between" mt={5} >
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 150, height: 45, fontSize: '16px', mr: 2 }}
              onClick={handleEditPostSubmit}
            >
              บันทึกการแก้ไข
            </Button>

            <Button
              variant="contained"
              color="warning"
              sx={{ width: 150, height: 45, fontSize: '16px' }}
              onClick={() => {
                setPostEditmode(false); // ปิดโหมดแก้ไข
                setNewPlaceImage(null); // ล้างรูปภาพใหม่
                setPlaceName(placeName);
                setNewPlaceName(placeName);

              }}
            >
              ยกเลิก
            </Button>

          </Box>
          : null}
      </Box >
    </>
  );
}

export default PostUI;