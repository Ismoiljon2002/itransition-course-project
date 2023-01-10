import React from 'react';
import { Rating } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import './styles/Review.css';

function Review({ review }) {
    const { img, text, title, createdAt, ratedUsers, by, likedUsersId } = review;
    let rate = 0;
    if (ratedUsers.length > 0) {
        ratedUsers.map(user => rate += user.rate);
        rate /= ratedUsers.length;
        rate = rate.toFixed(1);
    }

    const months = ["January", 'February', "March", 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Noverber', 'December'];
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDay() + 1;

    return (
        <div className="review card">

            <div className="img-field" style={{ backgroundImage: `url(${img.url}) ` }}>{img.url ? "" : <h5>{title} image is loading...</h5>}</div>

            <div className="card-body">
                <h2>{title}</h2>

                <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                <span className="rate">{rate}/5</span>
                <br />
                <p className="author">By <span>{by}</span></p>
                <p className="date">{`${month} ${day}, ${year}`}</p>

                <p>{text}</p>
                <p>
                    <ThumbUpAltIcon />
                    <span className="badge badge-pill badge-success">{likedUsersId.length && 0}</span>
                </p>

            </div>

        </div>
    );
}

export default Review;