import { Button } from "react-bootstrap";
import "./ReviewList.css";
import { Link } from "react-router-dom";
import { useDbData } from "../../utilities/firebase";
import { useEffect, useState } from "react";
import { ReviewCard } from "../ReviewCard.jsx/ReviewCard";
import { ReviewForm } from "../ReviewForm/ReviewForm";

export const ReviewList = ({ selected }) => {
  const [reviews, setReviews] = useState([]);

  const [restroomReviews, error] = useDbData(
    `reviews/${selected && selected.id}`
  );

  const [users, error2] = useDbData("/users");

  useEffect(() => {
    if (restroomReviews && users) {
      let reviewList = Object.values(restroomReviews);
      reviewList = reviewList.map((review) => {
        return {
          ...review,
          username: users[review.user_id]
            ? users[review.user_id].name
            : "Anonymous",
          photo: users[review.user_id] ? users[review.user_id].photoURL : "",
        };
      });
      setReviews(reviewList);
    }
  }, [users, restroomReviews]);

  const [form, setForm] = useState(false);
  const showForm = () => {
    if (form) {
      setForm(false);
    } else {
      setForm(true);
    }
  };

  return (
    <div className="reviews-div">
      <h2>{selected && selected.name} Restroom Reviews</h2>
      {form ? (
        <ReviewForm showForm={showForm} restroomId={selected.id} />
      ) : (
        <div>
          {reviews == null ? (
            <p>Select a store to see reviews</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="review-entry">
                <p>"{review.review}"</p>
                <p className="reviewer-name">- {review.username}</p>
              </div>
            ))
          )}
          <Button onClick={showForm}>Leave Review</Button>
        </div>
      )}
    </div>
  );
};

// {selectedReview == null ? (
//   <p>No reviews for this bathroom. Feel free to leave one!</p>
// ) : (
//   selectedReview.map((review, index) => (
//     <div key={index} className="review-entry">
//       <p>"{review.review}"</p>
//       <p className="reviewer-name">- {review.username}</p>
//     </div>
//   ))
// )}
// <Link to={`/review_form/${selected ? selected.id : ""}`}>
//   <Button>Leave Review</Button>
// </Link>
