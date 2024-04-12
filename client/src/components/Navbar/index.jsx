import styles from "./styles.module.css";
import { Link } from "react-router-dom"

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Multilingual News</h1>
                <div>
                    <Link to="/" className={styles.nav_link}>Home</Link>
                    <Link to="/news" className={styles.nav_link}>News</Link>
                    <a href="/news" className={styles.nav_link}>News</a>
                    <a href="/sport" className={styles.nav_link}>Sport</a>
                    <a href="/earth" className={styles.nav_link}>Earth</a>
                    <a href="/worklife" className={styles.nav_link}>Worklife</a>
                    <a href="/travel" className={styles.nav_link}>Travel</a>
                    <a href="/culture" className={styles.nav_link}>Culture</a>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;