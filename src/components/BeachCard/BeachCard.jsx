import {Link} from 'react-router-dom';
import './BeachCard.css';
import heartFull from "../../assets/heartFull.svg";
import heartEmpty from "../../assets/heartEmpty.svg";

function BeachCard({id, name, province, beachFeatures, rating, isFavorite, onToggleFavorite}) {
    return (
        <article className="beach-card">
           <div className="beach-card-content">
                <h3><Link to={`/beaches/${id}`}>{name}</Link></h3>
                <div className="beach-card-info">
                    <p>{province}</p>
                    {beachFeatures.map((beachFeature) => (
                        <p key={beachFeature.id}>{beachFeature.name}</p>))}
                </div>
                {rating ? <p className="rating">{rating.toFixed(1)}/5</p> : <p>No reviews yet</p>}
           </div>
            <button className="favorite-button" type="button" onClick={() => onToggleFavorite(id)}>
                <img src={isFavorite ? heartFull : heartEmpty} alt="Favorite icon"/>
            </button>
        </article>
    );
}

export default BeachCard;

