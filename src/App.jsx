//App.jsx ใช้ในการกำหนดเส้นทาง(Route)
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline , Box} from "@mui/material";

import HomeUI from "./views/HomeUI.jsx";
import LoginUI from "./views/LoginUI.jsx";
import RegisterUI from "./views/RegisterUI.jsx";
import MyProfileUI from "./views/MyProfileUI.jsx";
import EditMyProfileUI from "./views/EditMyProfileUI.jsx";
import PostUI from "./views/PostUI.jsx";
import AddPostUI from "./views/AddPostUI.jsx";
import EditPostUI from "./views/EditPostUI.jsx";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeUI />} />
          <Route path="/home" element={<HomeUI />} />
          <Route path="/login" element={<LoginUI />} />
          <Route path="/register" element={<RegisterUI />} />
          <Route path="/myprofile" element={<MyProfileUI />} />
          <Route path="/editmyprofile" element={<EditMyProfileUI />} />
          <Route path="/post" element={<PostUI />} />
          <Route path="/post/:placeId" element={<PostUI />} />
          <Route path="/addpost" element={<AddPostUI />} />
          <Route path="/editpost" element={<EditPostUI />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;