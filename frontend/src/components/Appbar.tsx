import { Typography, Button } from "@mui/material"

function Appbar() {
    return <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" component="div">
                Toodooz
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button>Login</Button>
                <Button>SignUp</Button>
            </div>
        </div>
    </>
}

export default Appbar