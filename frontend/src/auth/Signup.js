import React from "react";
import { useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";

const Signup = ()=>{
    const [errorMessages, setErrorMessages] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [username, setUsername] = useState("");
    const handleSignup = ()=>{
        axios.post('https://verifiedcreate', {Email: email, Password: password, verificationCode: code, Username: username})
        .then(console.log("email sent"));
    }
    const handleVerification = ()=>{
        axios.post('https://createunverified', {Email: email})
        .then(console.log("verified"))
    }
    return (
        <Container
        sx={{
            display:"flex",
            justifyContent: "center"}}
        >
            <Grid container spacing={2} maxWidth="sm" justify="center" sx={{
                p:2,
                mt:20,
                boxShadow: 1,
                borderRadius: 2,
            }}>
                <Grid item xs={12}>
                    <h2>Sign Up</h2>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        required
                        fullWidth
                        onChange={(newValue) => {
                            setEmail(newValue.target.value);
                            }
                        }
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleVerification}>Send Code</Button>
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        id="outlined-email-input"
                        label="Username"
                        required
                        fullWidth
                        onChange={(newValue) => {
                            setUsername(newValue.target.value);
                            }
                        }
                        />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Password"
                        required
                        fullWidth
                        type="password"
                        onChange={(newValue) => {
                            setPassword(newValue.target.value);
                            }
                        }
                        />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-email-input"
                        label="Verification Code"
                        required
                        fullWidth
                        onChange={(newValue) => {
                            setCode(newValue.target.value);
                            }
                        }
                        />
                </Grid>
                <div class="email error">{errorMessages}</div>
                <Grid item xs={12}>
                    <Button sx={{m:3}}onClick={handleSignup}>SIGN UP</Button>
                </Grid>
            </Grid>    
        </Container>
        
    )
}
export default Signup;