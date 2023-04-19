import React from "react";
import { useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const Login = ()=>{
	const [errorMessages, setErrorMessages] = useState("");
	const [email, setEmail] = useState("");
	const postEmail = ()=>{
		axios.post('https://reqres.in/api/articles', {email: email})
			.then(() => console.log("email sent"));
	}
	return (
		<Container maxWidth="xs" sx={{
			p:2,
			mt:20,
			boxShadow: 1,
			borderRadius: 2,
			alignSelf: "center"
		}}>
			<h2>Log In</h2>
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

			<div className="email error">{errorMessages}</div>
			<Button sx={{m:3}} onClick={postEmail}>LOG IN</Button>
			{/* <Link to="/signup">Don't have an account?</Link> */}
		</Container>
	)
}
export default Login;