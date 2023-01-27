import AdminContent from "./AdminContent";
import BlogContact from "./BlogContact";
import Header from "./Header";

const Adminpage = () => {
    return (
        <>
            <Header user={false} />
            <AdminContent />
            <BlogContact />
        </>
    )
}

export default Adminpage;