import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { CurrentUserContext } from '../context/currentUser';

import { TextField, Typography, Rating } from '@mui/material';
import './styles/CreateReview.css';
import { Link } from 'react-router-dom';

function CreateReview() {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const imageInput = useRef();
    const [ reviewImages, setReviewImages ] = useState([]);
    const [ reviewTitle, setReviewTitle ] = useState('');
    const [ reviewBody, setReviewBody ] = useState('');
    const [ reviewCollectionName, setReviewCollectionName ] = useState('');
    const [ rateValue, setRateValue ] = useState(0);

    console.log(currentUser, 'currentUser')
    const onImageLoad = (e) => {
        const image = e.target.files[0];

        let fileReader = new FileReader();
        fileReader.readAsDataURL(image);

        fileReader.onloadend = () => {
            console.log("image: ", fileReader.result)
            setReviewImages(fileReader.result)
        };

        fileReader.onabort = () => {console.log("reading aborted")}
        fileReader.onerror =  () => {console.log("reading error")}
    }

    const createReview = (e) => {
        e.preventDefault();
        if (!reviewTitle && !reviewBody ) return;
        
        console.log(reviewTitle, reviewBody)
        axios.post('http://localhost:1879/api/addReview', {
            firstName: currentUser.firstName,
            title: reviewTitle,
            img: reviewImages,
            text: reviewBody,
            tags: "",
        }).then(res => {
            console.log(res.data, 'came from review add')
            if (res.data.status === "OK") {
                setReviewImages(null)
                setReviewTitle("");
                setReviewBody("")
            }
        })
    }

    if (currentUser._id) 
    return (
        <div className='createReviewComponent'>
            <div className="card">
                <form action="" onSubmit={createReview}>
                    <div className=''>
                        <h3 className="sub-header">Upload Your Image</h3>

                        <div className="draggable-container">
                            <input type="file" 
                            ref={imageInput}
                            className='btn btn-light' name="" id=""
                            accept=".jpg, .jpeg, .png" multiple={true}
                            onChange={e => 
                            onImageLoad(e)}
                            onDragOver={e => {
                                e.preventDefault();
                                e.stopPropagation();
                            }} />
        
                            <img src={reviewImages} alt="" width={300} />

                        </div>
                    </div>
                    <br />
                    <TextField 
                        id="outlined-basic" 
                        label="Review Collection Name" 
                        variant="outlined" 
                        fullWidth
                        inputProps={{maxLength: 18}}
                        onChange={e => setReviewCollectionName(e.target.value)}
                    />
                    <br /> <br />
                    <TextField 
                        id="outlined-basic" 
                        label="Name of the reviewed data" 
                        variant="outlined" 
                        fullWidth
                        onChange={e => setReviewTitle(e.target.value)}
                    />
                    <br /> <br />
                    
                    <Typography component="legend">Rate Data that You are Reviewing</Typography>
                    <Rating 
                        value={rateValue}

                        name="customized-10" 
                        defaultValue={0} 
                        max={10} 
                    />
                    <br />
                    
                    <TextField 
                        id="outlined-basic" 
                        label="Title of Review" 
                        variant="outlined" 
                        fullWidth
                        inputProps={{maxLength: 80}}
                        onChange={e => setReviewTitle(e.target.value)}
                    />
                    <br /> <br />
                    <TextField
                        id="outlined-multiline-static"
                        label="Review text"
                        multiline
                        rows={4}
                        fullWidth
                        onChange={e => setReviewBody(e.target.value)}
                    />

                    <button className="btn btn-primary" type='submit'>Create</button>
                </form>
            </div>
        </div>
    );
    return (
        <div className="createReviewComponent">
            <h2 className="py-3">You have not signed in to Your account yet</h2>

            {/* <Link to="/signup"> */}
                <button className="btn btn-primary">Sign in</button>
            {/* </Link> */}
        </div>
    )
}

export default CreateReview;