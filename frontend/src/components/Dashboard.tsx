import { Button, Typography } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { userName } from "../store/userName";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const username = useRecoilValue(userName);
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate('/');
    }

    return (
        <>
            <div className="header-bar">
                <Typography variant="h5" component="div" className="header-text">
                    {username}'s Toodooz
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" color="error" onClick={logoutHandler}>Logout</Button>
                </div>
            </div>
            <div className="add-todo-button">
            <Button variant="contained" color="success">Add Todo</Button>
            </div>
        </>
    );
}
export default Dashboard;
