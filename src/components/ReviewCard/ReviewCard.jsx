import './ReviewCard.css';
import profileIcon from "../../assets/profileIcon.svg";
import formatDate from "../../helpers/formatDate.js";

function ReviewCard({userName, createDate, title, text, score}) {
    return (
        <article className="review-card">
            <div className="review-card-header">
                <div className="review-card-icon-author">
                    <img src={profileIcon} alt=""/>
                    <div className="review-card-userName-date">
                        <div className="review-card-userName-date">
                            <p className="review-card-author">{userName}</p>
                            <p className= "date">{formatDate(createDate)}</p>
                        </div>
                    </div>
                </div>
                <p className ="rating">{score}/5</p>
            </div>
            <h4>{title}</h4>
            <p>{text}</p>
        </article>
    )
}

export default ReviewCard;