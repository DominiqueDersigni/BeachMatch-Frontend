import { Link } from 'react-router-dom';
import './BeachCard.css';

function BeachCard({ id, name, province, beachFeatures, rating }) {
    return (
        <article className="beach-card">
            <h3><Link to={`/beaches/${id}`}>{name}</Link></h3>
            <div className="beach-card-info">
                <p>{province}</p>
                {beachFeatures.map((beachFeature) => (
                    <p key={beachFeature.id}>{beachFeature.name}</p>))}
            </div>
            { rating ? <p className = "rating">{rating.toFixed(1)}/5</p> : <p>No reviews yet</p>}
        </article>
    );
}

export default BeachCard;