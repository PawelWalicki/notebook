import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { Button, Container, Grid2, TextField } from "@mui/material";
import { Footer } from "../components/Footer";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
          loginWithUsernameAndPassword(e)
        }
      }

    return (
        <Container>
            <h1 className='title'> Sign in </h1>
            <div className='alert'>
                {"" !== notice &&
                    <div role="alert">
                        {notice}
                    </div>
                }
            </div>
            <Grid2 container spacing={2} size="grow" display="flex" justifyContent="center" alignItems="center">
                <Grid2 size={7}>
                    <TextField
                        type="email"
                        label="E-mail"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="name@example.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                color: "#417f9e",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#417f9e",
                                    borderWidth: "2px",
                                },
                            },
                            "& .MuiInputLabel-outlined": {
                                color: "#417f9e",
                            },
                        }}
                    >
                    </TextField>
                </Grid2>
                <Grid2 size={7}>
                    <TextField
                        type="password"
                        label="Password"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onKeyDown={e => handleEnterKeyPress(e)}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                color: "#417f9e",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#417f9e",
                                    borderWidth: "2px",
                                },
                            },
                            "& .MuiInputLabel-outlined": {
                                color: "#417f9e",
                            },
                        }}
                    >
                    </TextField>
                </Grid2>
                <Grid2 display="flex" justifyContent="center" alignItems="center" size={7}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={(e) => loginWithUsernameAndPassword(e)}
                    >Submit
                    </Button>
                </Grid2>
                <Grid2 display="flex" justifyContent="center" alignItems="center" size={7} paddingTop={"10px"}>
                    <span>Need to sign up for an account? <Link to="/register">Click here.</Link></span>
                </Grid2>
            </Grid2>
            <Footer/>
        </Container >
    )
}
