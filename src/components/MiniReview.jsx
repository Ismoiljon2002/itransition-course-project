import React from 'react';
import './styles/MiniReview.css';

function MiniReview ({review}) {
    const {img, title, createdAt, ratedUsers} = review;
    
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay() + 1;
    
    return ( 
        <div className="mini-review">
            <div className="img" style={{backgroundImage: `url(${img})`}}></div>
            <div className="content">
                <h5 className="title">{title}</h5>
                <p><span>{ratedUsers.length && 0}/5</span><span>{`${day}.${month}.${year}`}</span></p>
            </div>
        </div> 
    );
}

export default MiniReview ;