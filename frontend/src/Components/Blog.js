import "./Blog.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid';

const Blog = () => {
    const [blogData, setBlogData] = useState();
    const [blogLoading, setBlogLoading] = useState(true);

    const fetchData = async() => {
        try { 
            setBlogLoading(true);
            const res = await axios.get("https://agumentik-backend.onrender.com/blog/");
            const data = res.data[0];
            setBlogData(data);
            setBlogLoading(false);
        }catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {blogLoading ? "" :
            <div className="blog-section">
                <h1>{blogData.heading}</h1>
                <br /><br />
                <Grid container spacing={4}>
                    <Grid item md={6} sm={12}>
                        <p>{blogData.paragraph}</p>
                    </Grid>
                    <Grid className="blog-image-container" item md={6} sm={12}>
                        <img alt="blog" src={blogData.image} />
                    </Grid>
                </Grid>
            </div>}
        </div>
    )
}

export default Blog;