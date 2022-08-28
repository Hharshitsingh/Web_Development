import Login from "./componets/user/login";
import Home from "./componets/home/home";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from "./componets/header/header";
import UserProfile from "./componets/user/profile";


function App() {

  const [user, setUser] = useState(null);
  console.log(user);

  const getUser = async () => {
    try {
      const url = `http://localhost:4000/login/sucess`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data.user);
      setUser(data.user);
    } catch (err) {
      // console.log(err.response);
    }
  };

  console.log(user);

  useEffect(() => {
    getUser();
  }, []);


  return (


    <>

      <Header user={user} />
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Home user={user} />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
