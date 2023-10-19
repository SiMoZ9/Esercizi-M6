import NavLog from "./login/NavLog";
import Footer from "../components/footer/Footer";
import useSession from "../hooks/useSession";
const Logout = () => {

    const session = useSession()

    const token = JSON.parse(localStorage.getItem('loggedInUser'))

    if (token) {
        localStorage.removeItem('loggedInUser')
    }

    return (
        <>
            <NavLog/>
            {token && <div>
                <h1>Logout avvenuto</h1>
            </div>}

            {!token && <div>
                <h1>Utente non esiste</h1>
            </div>}
            <Footer/>
        </>
    );
}

export default Logout;