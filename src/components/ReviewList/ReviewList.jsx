import { Button } from "react-bootstrap";
import "./ReviewList.css";
import { Link } from "react-router-dom";

export const ReviewList = ({ selected, reviews }) => {
  const selectedReview = selected != null ? reviews[selected.id] : null;

  return (
    <div className="reviews-div">
      <h2>{selected && selected.name} Restroom Reviews</h2>
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
      <Link to={`/review_form`}>
        <Button>Leave Review</Button>
      </Link>
    </div>
  );
};
