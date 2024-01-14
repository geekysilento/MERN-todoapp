import { Button, Card, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSignin = async () => {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_ID}:3000/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            navigate("/todos")
            window.location.reload();
        } else {
            alert("invalid credentials");
        }
    }


    return <>
        <Typography style={{ display: "flex", justifyContent: "center", marginTop: 100 }} variant={"h6"}>
            Login Below:
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <Card variant={"outlined"} style={{ width: 400, padding: 40, backgroundColor: "whitesmoke" }} >
                <TextField id="username" label="username" variant="filled" fullWidth={true} onChange={(e) => setUsername(e.target.value)} />
                <br /><br />
                <TextField id="password" label="Password" variant="filled" type={"password"} fullWidth={true} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
                <Button size={"large"} variant="contained" onClick={handleSignin}>SignIn</Button>
                <Typography onClick={() => {
                    navigate("/signup");
                }} style={{ display: "flex", justifyContent: "center", marginTop: 30, cursor: "pointer" }} variant={"body2"}>
                    New here? Click here to Signup
                </Typography>
            </Card>
        </div>
    </>
}
export default Signin