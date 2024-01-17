import { Button, Card, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { authState } from '../store/authState';

function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const setAuth = useSetRecoilState(authState);

    const handleSignup = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ID}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            setAuth({ token: data.token, username: username });
            console.log({setAuth})
            navigate("/todos")
        } else {
            alert("invalid credentials");
        }
    }

    return <>
        <Typography style={{ display: "flex", justifyContent: "center", marginTop: 100 }} variant={"h6"}>
            Signup Below:
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <Card variant={"outlined"} style={{ width: 400, padding: 40, backgroundColor: "whitesmoke" }}>
                <TextField id="username" label="username" variant="filled" fullWidth={true} onChange={(e) => setUsername(e.target.value)} />
                <br /><br />
                <TextField id="password" label="Password" variant="filled" type={"password"} fullWidth={true} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
                <Button size={"large"} variant="contained" onClick={handleSignup}>SignUp</Button>
                <Typography onClick={() => {
                    navigate("/signin");
                }} style={{ display: "flex", justifyContent: "center", marginTop: 30, cursor: "pointer" }} variant={"body2"}>
                    Already a member? Click here to Login
                </Typography>
            </Card>
        </div>
    </>
}
export default Signup