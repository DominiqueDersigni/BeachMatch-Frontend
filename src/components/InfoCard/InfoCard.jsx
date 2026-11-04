import './InfoCard.css';

function InfoCard({icon, title, informationText}) {
    return (
        <article className="info-card">
            <div className="info-card-header">
                <img src={icon} alt=""/>
                <h3>{title}</h3>
            </div>
            <p>{informationText}</p>
        </article>
    )
}

export default InfoCard;