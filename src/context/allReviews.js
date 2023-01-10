import React, { createContext, useState } from 'react';

export const AllReviewsContext = createContext();

export const AllReviewsProvider = ({ children }) => {

    const [allReviews, setAllReviews] = useState([])
    allReviews.sort((a, b )=> {
        const timeOfA = new Date(a.createdAt);
        const timeOfB = new Date(b.createdAt);
        return (
            timeOfA.getTime() - timeOfB.getTime()
        )
    }).reverse();

    return <AllReviewsContext.Provider value={{ allReviews, setAllReviews }}>
        {children}
    </AllReviewsContext.Provider>
}