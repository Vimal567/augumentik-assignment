import "./AdminContent.css";
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from "notistack";
import TextField from '@mui/material/TextField';
import { useReactToPrint } from "react-to-print";


const AdminContent = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [contentData, setContentData] = useState();
    const [contentLoading, setContentLoading] = useState(true);
    const [visitorsLoading, setVisitorsLoading] = useState(true);
    const [contentEdit, setContentEdit] = useState({
        heading: "",
        paragraph: "",
        image: ""
    })
    const [newAdmin, setNewAdmin] = useState();
    const [visitors, setVisitors] = useState();
    
    const fetchdata = async() => {
        setContentLoading(true);
        const data = await axios.get("https://agumentik-backend.onrender.com/content/");
        setContentData(data.data[0])
        setContentLoading(false);
    }
    
    useEffect(()=> {
        fetchdata()
    }, []);
    
    const handleHeading = (event) => {
        const obj = {
            heading : event.target.value,
            paragraph : contentEdit.paragraph,
            image: contentEdit.image
        }
        setContentEdit(obj);
    }

    const handleParagraph = (event) => {
        const obj = {
            heading : contentEdit.heading,
            paragraph : event.target.value,
            image: contentEdit.image
        }
        setContentEdit(obj);
    }

    const handleImage = (event) => {
        const obj = {
            heading : contentEdit.heading,
            paragraph : contentEdit.paragraph,
            image: event.target.value
        }
        setContentEdit(obj);
    }

    const handleSubmit = async() => {
        if(contentEdit.heading.length === 0)
            contentEdit.heading = contentData.heading
        if(contentEdit.paragraph.length === 0)
            contentEdit.paragraph = contentData.paragraph
        if(contentEdit.image.length === 0)
            contentEdit.image = contentData.image
        await axios.put("https://agumentik-backend.onrender.com/content/", contentEdit);
        fetchdata();
        enqueueSnackbar('updated Successfully',{ 
            variant: 'success',
        })
        setContentEdit({
            heading: "",
            paragraph: "",
            image: ""
        })
    }

    const handleEmailChange = (event) => {
        setNewAdmin(event.target.value);
    }

    const handleNewAdmin = async() => {
        await axios.post("https://agumentik-backend.onrender.com/admin/", {email : newAdmin});
        enqueueSnackbar('Added Successfully',{ 
            variant: 'success',
        })
    }

    const visitorsData = async() =>{
        setVisitorsLoading(true);
        const data = await axios.get("https://agumentik-backend.onrender.com/visitors/");
        setVisitors(data.data);
        setVisitorsLoading(false);
    }

    useEffect(()=> {
        visitorsData();
    }, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Visitors Data",
        onAfterPrint: () =>enqueueSnackbar('Printed Successfully',{ 
            variant: 'success',
        })
    })

    return (
        <>
            <div className="admin-content-section">
                {contentLoading ? 
                <div className="admin-content-loading">
                    <CircularProgress style={{"marginRight": "10px"}} color="warning" />Backend loading please wait...
                </div>: 
                    <Grid container  spacing={2}>
                        <Grid item md={6} sm={12}>
                            <div className="admin-content-section">
                                <div className="admin-content-form">
                                    <h5>Heading</h5>
                                    <TextField
                                    onChange={handleHeading}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    rows={4}
                                    defaultValue={contentData.heading}
                                    variant="standard"
                                    />
                                    <h5>Paragraph</h5>
                                    <TextField
                                    onChange={handleParagraph}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    multiline
                                    rows={4}
                                    defaultValue={contentData.paragraph}
                                    variant="standard"
                                    />
                                    <h5>Image Link</h5>
                                    <TextField
                                    onChange={handleImage}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    multiline
                                    rows={4}
                                    defaultValue={contentData.image}
                                    variant="standard"
                                    />
                                    <button onClick={handleSubmit}>Click to Save</button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <div className="admin-print">
                                <input 
                                onChange={handleEmailChange}
                                className="adminChange-input" 
                                type="text"
                                placeholder="Enter email to make admin" />
                                <br />
                                <button onClick={handleNewAdmin}  className="adminChange-input" type="submit" >Add</button>
                                <br />
                                <div ref={componentRef} className="print-space">
                                    {visitorsLoading ? "" : visitors.map((item, index) => {
                                        return <div key={index}>
                                            <div>{index + 1}) Name : {item.name}</div>
                                            <div>Phone Number: {item.phone}</div>
                                        </div>
                                    })}
                                </div>
                                <br />
                                <button onClick={handlePrint}>Print</button>
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
        </>
    )
}

export default AdminContent;