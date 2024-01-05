import { Button, Card, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSignup = async () => {
        const response = await axios.post('http://localhost:3000/auth/signup', {
            username: username,
            password: password
        });

        const data = await response.data;
        if (data.token) {
            localStorage.setItem("token", data.token)
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
            <Card variant={"outlined"} style={{ width: 400, padding: 40 }}>
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