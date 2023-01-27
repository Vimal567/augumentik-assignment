import "./Header.css";
import logo from "../logo.png";
import {Navbar,Nav,Container} from 'react-bootstrap';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/system";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    p: 4,
};

const Header = ({user}) => {
    const { enqueueSnackbar } = useSnackbar();  //It is a short description notification from bottom of page
    const [dashboardButtonLoading, setDashboardLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try { 
            setDashboardLoading(true);
            const res = await axios.get("https://agumentik-backend.onrender.com/admin/");
            const data = res.data;
            let found = data.filter((item) =>{
                return item.email === email.toLowerCase();
            })
            if(found.length !== 0){
                setVerified(true);
                window.localStorage.setItem("mail", found[0].email)
            }else{
                enqueueSnackbar('Please enter right email ("user@gmail.com")',{ 
                  variant: 'warning',
                })
            }
            setDashboardLoading(false);
        }catch (e){
            console.log(e);
        }
    }

    return(
        <div>
            {user ? 
                <div className="user-header">
                    <Navbar className='fixed-top' collapseOnSelect expand="md" id="navbg">
                    <Container>
                        <Navbar.Brand className="company-logo" onClick={() => window.location.reload()}>
                            <img alt="logo" src={logo} /><span>Climp.co</span>
                        </Navbar.Brand>
                        <div className='justify-content-end'>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <span className="user-titles-container">
                                    <span className="user-header-titles">Business</span>
                                    <span className="user-header-titles">How it works</span>
                                    <span className="user-header-titles">About us</span>
                                    <span className="user-header-titles">Pricing</span>
                                    <button onClick={handleOpen} className="user-header-titles dashboard-button">
                                        Admin Dashboard
                                    </button>
                                </span>
                            </Nav>
                            </Navbar.Collapse>
                        </div>
                    </Container>
                    </Navbar>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={handleEmailChange} type="text" placeholder="Example:user@gmail.com" />
                                    
                                </Form.Group>
                                {dashboardButtonLoading ? <CircularProgress color="primary" /> :
                                verified ? <Button 
                                    onClick={handleSubmit} 
                                    style={{backgroundColor : "rgb(37, 98, 238)"}} 
                                    variant="primary" 
                                    type="submit">
                                    <Link to="/admin" style={{color : "white", textDecoration : "none"}}>Click to login</Link>
                                </Button>:
                                <Button 
                                    onClick={handleSubmit} 
                                    style={{backgroundColor : "rgb(37, 98, 238)"}} 
                                    variant="primary" 
                                    type="submit">
                                    Submit
                                </Button>}
                            </Form>
                        </Box>
                    </Modal>
                </div>
            :
            <div className="admin-header">
                <h2>Admin Page</h2>
                <div className="admin-header-titles">
                    <h5>{window.localStorage.getItem("mail")}</h5>
                    <button onClick={() => window.localStorage.clear()}>
                        <Link to="/" style={{color : "rgb(2, 71, 160)", textDecoration : "none"}}>Logout</Link>
                    </button>
                </div>
            </div>
            }
        </div>
    )
}

export default Header;