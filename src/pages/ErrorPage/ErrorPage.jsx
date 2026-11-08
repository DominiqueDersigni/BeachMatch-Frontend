import './ErrorPage.css';
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
function ErrorPage() {

    return (
        <main className="error-page">
        <h1>404 Page not found</h1> <Link to="/"><Button>Go to homepage</Button></Link>
        </main>
    )
}

export default ErrorPage;