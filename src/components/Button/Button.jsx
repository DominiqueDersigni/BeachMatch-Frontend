import './Button.css';

function Button({children, type, onClick, variant=""}) {
    return (
        <button className = {`multi-use-button ${variant}`} type={type} onClick={onClick}> {children}</button>
    );
}

export default  Button
