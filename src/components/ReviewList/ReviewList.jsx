import { Button } from "react-bootstrap";
import "./ReviewList.css";
import { Link } from "react-router-dom";
import { useDbData } from "../../utilities/firebase";
import { useEffect, useState } from "react";
import { ReviewCard } from "../ReviewCard.jsx/ReviewCard";

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

  return (
    <div className="reviews-div">
      <h2>{selected && selected.name} Restroom Reviews</h2>
      {reviews == null ? (
        <p>No reviews for this bathroom. Feel free to leave one!</p>
      ) : (
        reviews.map((review, index) => (
          <ReviewCard
            key={index}
            review={review.review}
            username={review.username}
            rating={review.rating}
            photo={review.photo}
          />
        ))
      )}
      <Link to={`/review_form/${selected ? selected.id : ""}`}>
        <Button>Leave Review</Button>
      </Link>
    </div>
  );
};
