import "./Contact.css";
import { useState, useEffect } from "react";
import logo from "../logo.png";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/system";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    p: 4,
};

const Contact = () => {
    const [contactLoading, setContactLoading] = useState(true);
    const [contactData, setContactData] = useState();
    const [contactButton, setContactButton] = useState(true);
    const [social, setSocial] = useState();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = (url) => {
        setSocial(url);
        setOpen(true);
    };

    const fetchData= async() => {
        try { 
            setContactLoading(true);
            const res = await axios.get("https://agumentik-backend.onrender.com/contact/");
            const data = res.data[0];
            setContactData(data);
            setContactLoading(false);
        }catch (e){
            console.log(e);
        }
    }

    const handleClick = () => {
        setContactButton(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {contactLoading ? "" :
            <div className="contact-section">
                <div className="contact-container">
                    <Grid container spacing={4}>
                        <Grid item md={6} sm={12}>
                            <div className="contact-logo-container">
                                <img alt="logo" src={logo} />
                                <span>Climp.co</span>
                            </div>
                            <br />
                            <p>The Climp.co Platform can handle volumes of tedious, time-consuming phone calls 
                                with super-human accuracy and easy-to-track updates. Simply set the task and 
                                get back to the customer interactions that really matter.
                            </p>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <div className="address-container">
                                <h4>Address : </h4>
                                <p>{contactData.address}</p>
                            </div>
                                <br />
                            <div>
                                {contactButton ? 
                                <div className="social-button">
                                    <button onClick={handleClick}>Social Icons</button>
                                </div>
                                :
                                <div className="social-button">
                                    <FacebookIcon onClick={() => handleOpen(contactData.facebook)} />
                                    <LinkedInIcon onClick={() => handleOpen(contactData.linkedin)} className="social-links" />
                                    <InstagramIcon onClick={() => handleOpen(contactData.instagram)} className="social-links" />
                                </div>}
                            </div>
                        </Grid>
                    </Grid>
                    <br />
                    <div className="divider"></div>
                    <div className="divider"></div>
                    <br />
                    <div style={{textAlign: "center"}}>All Right Reserved 2021 - Climp.co</div>
                </div>
            </div>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        {social} 
                    </div>
                    <br />
                    <button 
                    value={social} 
                    className="copy-button"
                    onClick={(event) => navigator.clipboard.writeText(event.target.value)}
                    >
                        Click to copy
                    </button>
                </Box>
            </Modal>
        </div>
    )
}

export default Contact