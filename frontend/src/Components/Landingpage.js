import Contact from "./Contact";
import Blog from "./Blog";
import Contentpage from "./Contentpage";
import Header from "./Header";


const Landingpage = () => {
    return(
        <>
            <Header user={true} />
            <Contentpage />
            <Blog />
            <Contact />
        </>
    )
}

export default Landingpage;