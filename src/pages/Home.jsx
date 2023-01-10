import React, { useState, useEffect, useContext } from 'react';
import HomeReview from '../components/HomeReview';
import { AllReviewsContext } from '../context/allReviews';
import axios from 'axios';
import './styles/Home.css';

function Home() {
    const { allReviews, setAllReviews } = useContext(AllReviewsContext);
    useEffect(() => {
        axios.get("http://localhost:1879/api/getPosts")
            .then(res => {
                console.log("resp from getPosts", res.data)
                setAllReviews(res.data);
            })
    }, [])


    return (
        <div className="home">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Latest Reviews</h2>
                        {allReviews.map(review => 
                            <div className="col-md-3">
                                <HomeReview
                                    review={review}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;