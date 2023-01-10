import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <div className="not-found">
            <div className="container text-center">
                <h2 style={{fontSize: 50, fontWeight: 700}}>404</h2>
                <h3>Page Not Found!</h3>
                <Link to="/">
                    <button className="btn btn-light">Back to home</button>
                </Link>
            </div>
        </div>
     );
}
 
export default NotFound;