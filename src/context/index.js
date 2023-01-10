import React from 'react';
import { CurrentUserProvider } from './currentUser';
import { ThemeContextProvider } from './themeContext';
import { AllReviewsProvider } from './allReviews';

function AllContexts ({children}) {
    return ( 
        <CurrentUserProvider>
            <AllReviewsProvider>
                <ThemeContextProvider>
                    {children}
                </ThemeContextProvider>
            </AllReviewsProvider>
        </CurrentUserProvider>
     );
}

export default AllContexts ;
