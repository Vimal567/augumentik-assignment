import "./BlogContact.css";
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import TextField from '@mui/material/TextField';

const BlogContact = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [blogData, setBlogtData] = useState();
    const [contactData, setContactData] = useState();
    const [blogLoading, setBlogLoading] = useState(true);
    const [contactLoading, setContactLoading] = useState(true);
    const [blogEdit, setBlogEdit] = useState({
        heading: "",
        paragraph: "",
        image: ""
    })
    const [contactEdit, setContactEdit] = useState({
        facebook: "",
        linkedin: "",
        instagram: "",
        address: ""
    });

    const fetchdata = async() => {
        setBlogLoading(true);
        const data = await axios.get("https://agumentik-backend.onrender.com/blog/");
        setBlogtData(data.data[0])
        setBlogLoading(false);
    }
    
    useEffect(()=> {
        fetchdata()
    }, []);

    const handleHeading = (event) => {
        const obj = {
            heading : event.target.value,
            paragraph : blogEdit.paragraph,
            image: blogEdit.image
        }
        setBlogEdit(obj);
    }

    const handleParagraph = (event) => {
        const obj = {
            heading : blogEdit.heading,
            paragraph : event.target.value,
            image: blogEdit.image
        }
        setBlogEdit(obj);
    }

    const handleImage = (event) => {
        const obj = {
            heading : blogEdit.heading,
            paragraph : blogEdit.paragraph,
            image: event.target.value
        }
        setBlogEdit(obj);
    }

    const handleSubmit = async() => {
        if(blogEdit.heading.length === 0)
            blogEdit.heading = blogData.heading
        if(blogEdit.paragraph.length === 0)
            blogEdit.paragraph = blogData.paragraph
        if(blogEdit.image.length === 0)
            blogEdit.image = blogData.image
        await axios.put("https://agumentik-backend.onrender.com/content/", blogEdit);
        fetchdata();
        enqueueSnackbar('updated Successfully',{ 
            variant: 'success',
        })
        setBlogEdit({
            heading: "",
            paragraph: "",
            image: ""
        })
    }

    const fetchContact = async() => {
        setContactLoading(true);
        const data = await axios.get("https://agumentik-backend.onrender.com/contact/");
        setContactData(data.data[0])
        setContactLoading(false);
    }
    
    useEffect(()=> {
        fetchContact()
    }, []);

    const handleFacebook = (event) => {
        const obj = {
            facebook : event.target.value,
            linkedin : contactEdit.linkedin,
            instagram: contactEdit.instagram,
            address: contactEdit.address
        }
        setContactEdit(obj);
    }

    const handleLinkedin = (event) => {
        const obj = {
            facebook : contactEdit.facebook,
            linkedin : event.target.value,
            instagram: contactEdit.instagram,
            address: contactEdit.address
        }
        setContactEdit(obj);
    }

    const handleInstagram = (event) => {
        const obj = {
            facebook : contactEdit.facebook,
            linkedin : contactEdit.linkedin,
            instagram: event.target.value,
            address: contactEdit.address
        }
        setContactEdit(obj);
    }
    const handleAddress = (event) => {
        const obj = {
            facebook : contactEdit.facebook,
            linkedin : contactEdit.linkedin,
            instagram: contactEdit.instagram,
            address: event.target.value
        }
        setContactEdit(obj);
    }

    const handleContactSubmit = async() => {
        if(contactEdit.facebook.length === 0)
        contactEdit.facebook = contactData.facebook
        if(contactEdit.linkedin.length === 0)
            contactEdit.linkedin = contactData.linkedin
        if(contactEdit.instagram.length === 0)
            contactEdit.instagram = contactData.instagram
        if(contactEdit.address.length === 0)
            contactEdit.address = contactData.address
        await axios.put("https://agumentik-backend.onrender.com/content/", contactEdit);
        fetchContact();
        enqueueSnackbar('updated Successfully',{ 
            variant: 'success',
        })
        setContactEdit({
            heading: "",
            paragraph: "",
            image: ""
        })
    }

    return (
        <>
            <div className="admin-blog-contact-section">
            <Grid container  spacing={2}>
                        <Grid item md={6} sm={12}>
                            {blogLoading ? "" : <div className="admin-content-section">
                                <div className="admin-content-form">
                                    <h5>Heading</h5>
                                    <TextField
                                    onChange={handleHeading}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    rows={4}
                                    defaultValue={blogData.heading}
                                    variant="standard"
                                    />
                                    <h5>Paragraph</h5>
                                    <TextField
                                    onChange={handleParagraph}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    multiline
                                    rows={4}
                                    defaultValue={blogData.paragraph}
                                    variant="standard"
                                    />
                                    <h5>Image Link</h5>
                                    <TextField
                                    onChange={handleImage}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    multiline
                                    rows={4}
                                    defaultValue={blogData.image}
                                    variant="standard"
                                    />
                                    <button onClick={handleSubmit}>Click to Save</button>
                                </div>
                            </div>}
                        </Grid>
                        <Grid item md={6} sm={12}>
                        {contactLoading ? "" : <div className="admin-content-section">
                                <div className="admin-content-form admin-blog">
                                    <h5>Facebook Link</h5>
                                    <TextField
                                    onChange={handleFacebook}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    multiline
                                    rows={4}
                                    defaultValue={contactData.facebook}
                                    variant="standard"
                                    />
                                    <h5>Linkedin Link</h5>
                                    <TextField
                                    onChange={handleLinkedin}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    multiline
                                    rows={4}
                                    defaultValue={contactData.linkedin}
                                    variant="standard"
                                    />
                                    <h5>Instagram Link</h5>
                                    <TextField
                                    onChange={handleInstagram}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    multiline
                                    rows={4}
                                    defaultValue={contactData.instagram}
                                    variant="standard"
                                    />
                                    <h5>Address</h5>
                                    <TextField
                                    onChange={handleAddress}
                                    id="standard-multiline-static"
                                    style={{backgroundColor: "aqua", width: "300px"}}
                                    multiline
                                    rows={4}
                                    defaultValue={contactData.address}
                                    variant="standard"
                                    />
                                    <button onClick={handleContactSubmit}>Click to Save</button>
                                </div>
                            </div>}
                        </Grid>
                    </Grid>
            </div>
        </>
    )
}

export default BlogContact