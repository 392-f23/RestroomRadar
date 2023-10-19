import { Button } from "react-bootstrap";
import "./ReviewList.css";
import { Link } from "react-router-dom";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { useState } from "react";

export const ReviewList = ({ selected, reviews }) => {
  const selectedReview = selected != null ? reviews[selected.id] : null;

  const [form, setForm] = useState(false);
  const showForm = () => {
    if (form) {
      setForm(false);
    } else {
      setForm(true);
    }
  }

  return (
    <div className="reviews-div">
      <h2>{selected && selected.name} Restroom Reviews</h2>
      {form ?
      <ReviewForm showForm={showForm} /> :
      <div>
        {selectedReview == null ? (
          <p>Select a store to see reviews</p>
        ) : (
          selectedReview.map((review, index) => (
            <div key={index} className="review-entry">
              <p>"{review.review}"</p>
              <p className="reviewer-name">- {review.username}</p>
            </div>
          ))
        )}
        <Button onClick={showForm} >Leave Review</Button>
      </div>
      }
    </div>
  );
};
