import { Link } from 'react-router-dom';

function BeachCard({ id, name, province, beachFeatures, rating }) {
    return (
        <article className="beach-card">
            <h3><Link to={`/beaches/${id}`}>{name}</Link></h3>
            <p>{province}</p>
            {beachFeatures.map((beachFeature) => (
                <p key={beachFeature.id}>{beachFeature.name}</p>))}
            { rating ? <p>Rating: {rating.toFixed(1)}/5</p> : <p>No reviews yet</p>};
        </article>
    );
}

export default BeachCard;