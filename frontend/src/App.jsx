import { useState, useEffect } from "react";
import Left from "./Home/left/Left.jsx";
import Right from "./Home/right/Right.jsx";
import Login from "./Components/Login.jsx";
import SignUp from "./Components/SignUp.jsx";
import { useAuth } from "./contextApi/AuthProvider.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import ChangePassword from "./Components/ChangePassword.jsx";
import Loading from "./Components/Loading.jsx"; // Import Loading component

function App() {
  const [authUser] = useAuth();
  const [loading, setLoading] = useState(true); // State to manage loading

  // Simulate an API call or auth check
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate a 3 second loading time
  }, []);

  if (loading) {
    return <Loading />; // Show loading screen if loading is true
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            authUser ? ( 
              <div className="drawer lg:drawer-open">
                <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center justify-center">
                  <Right />
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu w-80 bg-[#001a23] min-h-full h-screen text-base-content">
                    <Left />
                  </ul>
                </div>
              </div>
            ) : (
              <Navigate to={'/login'} />
            )
          }
        />
        <Route path='/login' element={authUser ? <Navigate to={'/'} /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to={'/'} /> : <SignUp />} />
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;
