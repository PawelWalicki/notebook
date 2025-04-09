import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Grid2, TextField } from '@mui/material';
import "./Registration.css"


export const Registration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");



    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate("/");
            } catch {
                setNotice("Sorry, something went wrong. Please try again.");
            }
        } else {
            setNotice("Passwords don't match. Please try again.");
        }
    };

    return (
        <Container>
            <h1 className='title'> Registration </h1>
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
                        id="signupEmail"
                        type="email"
                        label="E-mail"
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
                        id="signupPassword"
                        type="password"
                        label="Password"
                        placeholder="Password"
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
                <Grid2 size={7}>
                    <TextField
                        id="confirmPassword"
                        type="password"
                        label="Confirm password"
                        placeholder="Confirm Password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
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
                        type="submit"
                        onClick={(e) => signupWithUsernameAndPassword(e)}
                        style={{
                            backgroundColor: "#417f9e",
                            color: "#ffffff",
                        }}
                    >Signup
                    </Button>
                </Grid2>
                <Grid2 display="flex" justifyContent="center" alignItems="center" size={7} paddingTop={"10px"}>
                    <span>Go back to login? <Link to="/login">Click here.</Link></span>
                </Grid2>
            </Grid2>
        </Container >
    )
}
