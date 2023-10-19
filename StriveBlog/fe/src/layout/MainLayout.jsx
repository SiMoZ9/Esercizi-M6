import NavBar from "../components/navbar/BlogNavbar";
import Footer from "../components/footer/Footer";
const MainLayout = ({children}) => {
    return (
        <>
            <NavBar/>
                {children}
            <Footer/>
        </>
    );
}

export default MainLayout