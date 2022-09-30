import { useState, useEffect } from 'react';
import { DataProvider } from './context/dataProvider';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Acccout from './components/admin/accout';
import Home from './components/home/home';
import Header from './components/header/header';
import CreatePost from './components/create/CreatePost';
import DetailPost from './components/home/post/detailpost';
import UpdatePost from './components/create/updatePost';
import About from './components/about/about';
import Contact from './components/contact/contact';
import LogoutUser from './components/admin/logout';
import Profile from './components/admin/profile';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  console.log(isAuthenticated);
  return isAuthenticated ?
    <>
      <Outlet />
    </> : (
      <Navigate replace to="/login" />
    )
}

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(isAuthenticated);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated'));
    console.log("32");
    if (isAuthenticated) {
      console.log("35");
      <Navigate replace to="/about" />
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);


  return (
    <DataProvider>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/create" element={<CreatePost />} />
          </Route>
          <Route path="/post/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/post/:id" element={<DetailPost />} />
          </Route>
          <Route path="/updateBlog/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/updateBlog/:id" element={<UpdatePost />} />
          </Route>
          <Route path="/about" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/contact" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/profile/:username" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/profile/:username" element={<Profile />} />
          </Route>

          <Route path="/login" element={<Acccout setIsAuthenticated={setIsAuthenticated} />} />

          <Route path="/logout" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/logout" element={<LogoutUser setIsAuthenticated={setIsAuthenticated} />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </DataProvider>

  );
}

export default App;
