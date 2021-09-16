import React, { useState, useContext } from 'react';
import { ContextObj } from '../../ContextObj.jsx';
import ReviewPicList from './ReviewPicList.jsx';
import { formatDate } from '../../helpers';

var ReviewListEntry = ({ review, setReviews, setCurReview }) => {


  return (
    (review.response) ?
      <div className='reviewEntry' >
        <div className='rating'>Rating: {review.rating}</div>
        <div className='date'>{review.reviewer_name}, {formatDate(review.date)}</div>
        <div className='summary'><b>{review.summary}</b></div>
        <div className='body'>{review.body}</div>
        <div>{(review.recommend) ? 'I recomend this product' : ''}</div>
        <div className='response'>Response: <br></br> <br></br>{review.response}</div>
        <ReviewPicList pictures={review.photos}/>
        <div className='helpful'>Helpful? <u>Yes({review.helpfulness})</u>  | <u>Report</u> </div>
      </div > :
      <div className='reviewEntry'>
        <div className='rating'>Rating: {review.rating}</div>
        <div className='date'>{review.reviewer_name}, {formatDate(review.date)}</div>
        <div className='summary'><b>{review.summary}</b></div>
        <div className='body'>{review.body}</div>
        <div>{(review.recommend) ? 'I recomend this product' : ''}</div>
        <ReviewPicList pictures={review.photos}/>
        <div className='helpful'>Helpful? <u onClick={()=>setCurReview(review.review_id)}>Yes({review.helpfulness})</u> | <u onClick={()=>console.log('ohYeahhh')}>Report</u> </div>
      </div>
  );
};

export default ReviewListEntry;