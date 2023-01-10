import React from 'react';
import './styles/HomeReview.css';

function HomeReview ({review}) {
    const { img, collectionName, title, createdAt, ratedUsers, by } = review;
    let rate = 0;
    if (ratedUsers.length > 0) {
        ratedUsers.map(user => rate += user.rate);
        rate /= ratedUsers.length;
        rate = rate.toFixed(1);
    }
    
    const collectionNameColors = ['orange', 'blue', 'darkblue', 'green', 'gold', 'purple', 'red'];
    const randomColor = collectionNameColors[Math.floor(Math.random() * 7)];
    
    const months = ["January", 'February', "March", 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Noverber', 'December'];
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDay() + 1;
    
    return ( 
        <div className="card home-review">
            <div className="card-header" style={{backgroundImage: `url(${img})`}}></div>
            <div className="card-body">
                <span className='collection-name' style={{color: randomColor}}>{collectionName}</span>
                <span className="rate">{rate}/5</span>
                <h4 className="title">{title}</h4>
                <p>By <span className="by-whom"> {by}</span> <span className="date"> {`${month} ${day}, ${year}`} </span> </p>
            </div>

        </div>
     );
}

export default HomeReview ;