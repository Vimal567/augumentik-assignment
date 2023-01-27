import "./Contentpage.css";
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    p: 4,
};

const Contentpage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [content, setContent] = useState();
    const [contentLoading, setContentLoading] = useState(true);
    const [visitorSubmitLoading, setVisitorSubmitLoading] = useState(false);
    const [visitorValue, setVisitorValue] = useState({
        name: "",
        phone: ""
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchdata = async() => {
        setContentLoading(true);
        const data = await axios.get("https://agumentik-backend.onrender.com/content/");
        setContent(data.data[0])
        setContentLoading(false);
    }
    useEffect(()=> {
        fetchdata()
    }, []);

    const handleNameChange = (event) => {
        const obj = {
            name : event.target.value,
            phone : visitorValue.phone
        }
        setVisitorValue(obj);
    }

    const handlePhoneChange = (event) => {
        const obj = {
            name : visitorValue.name,
            phone : event.target.value
        }
        setVisitorValue(obj);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try { 
            setVisitorSubmitLoading(true);
            const res = await axios.post("https://agumentik-backend.onrender.com/visitors/", visitorValue);
            const data = res.data;
            console.log(data);
            setVisitorSubmitLoading(false);
            enqueueSnackbar('Submitted Successfully',{ 
              variant: 'success',
            })
        }catch (e){
            console.log(e.response);
            setVisitorSubmitLoading(true);
            if (e.response && e.response.status === 400)
            {
            setVisitorSubmitLoading(false); 
            return  enqueueSnackbar( e.response.data.message, { variant: 'error'});
            }
            else {
            setVisitorSubmitLoading(false); 
            enqueueSnackbar( "Something went wrong. Check that the backend is running, reachable and returns valid JSON.", { variant: 'error'});
            }
        }
        handleClose(); 
    }

    return (
        <div className='content-section'>
            {contentLoading ? 
            <div className="content-loading">
                <CircularProgress style={{"marginRight": "10px"}} color="warning" />Backend loading please wait...
            </div>: 
            <Grid container className="content-container" spacing={2}>
                <Grid item md={6} sm={12}>
                    <h1>{content.heading}</h1>
                    <br /><br />
                    <p>{content.paragraph}</p>
                    <br /><br />
                    <button onClick={handleOpen}>Getting Started</button>
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
                                    <Form.Control onChange={handleNameChange} type="text" placeholder="Enter your Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control onChange={handlePhoneChange} type="phone" placeholder="Ex: 9441234567" />
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                {visitorSubmitLoading ? <CircularProgress color="primary" /> :<Button 
                                    onClick={handleSubmit} 
                                    style={{backgroundColor : "rgb(37, 98, 238)"}} 
                                    variant="primary" 
                                    type="submit">
                                    Submit
                                </Button>}
                            </Form>
                        </Box>
                    </Modal>
                </Grid>
                <br />
                <Grid item md={6} sm={12}>
                    <div className="content-image">
                        <img alt="content pic" src={content.image} />
                    </div>
                </Grid>
            </Grid>}
        </div>
  )
}

export default Contentpage;