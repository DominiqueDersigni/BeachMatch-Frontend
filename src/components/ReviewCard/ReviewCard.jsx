import './ReviewCard.css';
import profileIcon from "../../assets/profileIcon.svg";

function ReviewCard({userName, createDate, title, text, score}) {
    return (
        <article className="review-card">
            <div className="review-card-header">
                <div className="review-card-icon-author">
                    <img src={profileIcon} alt=""/>
                    <div className="review-card-userName-date">
                        <p>{userName}</p>
                        <p className= "date">{createDate}</p>
                    </div>
                </div>
                <p className ="rating">{score}/5</p>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
        </article>
    )
}

export default ReviewCard;