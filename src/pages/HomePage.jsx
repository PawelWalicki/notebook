import { useAuth } from "../hooks/useAuth";
import { Note } from '../components/Note';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import { signOut } from "firebase/auth";
import './HomePage.css'
import { Button } from "@mui/material";
import { Footer } from "../components/Footer";


export const HomePage = () => {
  const navigate = useNavigate();
  const { user, pending } = useAuth()
  console.log(user, pending)
  const logoutUser = async (e) => {
    e.preventDefault();

    await signOut(auth);
    navigate("/");
  }

  if (pending) {
    return (
      <div>Loading...</div>
    )
  }
  if (!user) {
    return (
      <div className="container-home">
        <div> User not logged in! </div>
        <div className="container-button">
          <Button variant="contained" color="primary" onClick={() => navigate("./login")}> Sign in!</Button>
          <Button variant="contained" color="primary" onClick={() => navigate("./register")} >Register!</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div >
      <div className="info-user">
        <p className="user">Welcome {user.email}</p>
        <div>
          <Button variant="contained" color="primary" onClick={(e) => logoutUser(e)}>Logout</Button>
        </div>
      </div>
      <Note />
      <Footer />
    </div>
  )
};
