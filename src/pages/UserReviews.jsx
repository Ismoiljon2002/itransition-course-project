import React, { useState, useEffect, useContext } from 'react';
import CreateReview from '../components/CreateReview';
import Review from '../components/Review';
import { CurrentUserContext } from '../context/currentUser';
import { Link } from 'react-router-dom';
import MiniReview from '../components/MiniReview';

function UserReviews() {
    const { currentUser } = useContext(CurrentUserContext);
    const [isCreatingReview, setIsCreatingReview] = useState(false);
    const [addReview, setAddReview] = useState(false);

    if (currentUser.status === "user" || currentUser.status === "admin") {
        return ( 
            <div className="user-dashboard">
                <div className="container">
                    <div className="col-md-9">
                        {
                            isCreatingReview ?
                                <>
                                    <h2 className="py-3">You do not have reviews yet</h2>

                                    <button className="btn btn-primary px-3 my-3"
                                        onClick={() => setIsCreatingReview(true)}>Create a Review</button>

                                </>
                                :
                                <>
                                    {currentUser.reviews.map(review => <Review
                                        key={review.id}
                                        review={review} />)}
                                    {!addReview ?
                                        <button
                                            onClick={() => setAddReview(!addReview)}
                                            className='btn btn-success px-3 my-3' >
                                            + Add Review
                                        </button> :
                                        <CreateReview />
                                    }
                                </>
                        }
                    </div>
                    <div className="col-md-3">
                        {currentUser.reviews.map(review => <MiniReview review={review} key={review}/>)}
                    </div>

                    <div className="clr"></div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="user-dashboard">
                <div className="container">
                    <h3>Oops, You are not authorized yet! Please, authorize your account!</h3>

                    <Link to="/signup">
                        <button className="btn btn-success px-4 my-3">Sign In</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default UserReviews;