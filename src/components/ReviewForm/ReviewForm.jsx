import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReactStars from "react-rating-stars-component";
import { useAuth, useDbData, useDbUpdate } from "../../utilities/firebase";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getRating } from "../../utilities/firebase";

export const ReviewForm = ({ showForm, restroomId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const user = useAuth();
  const [updateRestrooms, result1] = useDbUpdate(`/restrooms/${restroomId}/`);
  const [updateReviews, result2] = useDbUpdate(`/reviews/${restroomId}/`);
  const [restroomReviews, error] = useDbData(
    `/restrooms/${restroomId}/reviews`
  );

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const onSubmitReview = () => {
    const uuid = uuidv4();

    if (review) {
      let reviewObj = {
        review: review,
        rating: rating,
        user_id: user[0].uid,
      };
      updateReviews({ [uuid]: reviewObj });
      const currentRestroomReviews = restroomReviews || [];
      currentRestroomReviews.push(uuid);
      updateRestrooms({ reviews: currentRestroomReviews });

      setReview("");
      setRating(0);
      setShowAlert(true);
      showForm();
    }
  };

  return (
    <Form className="p-3">
      <Alert
        onClose={() => setShowAlert(false)}
        dismissible
        show={showAlert}
        variant="success"
      >
        You submitted a review!
      </Alert>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setReview(e.target.value)}
          value={review}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Rating</Form.Label>
        <div>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            value={0}
          />
        </div>
        <div className="d-flex my-3">
          <Button onClick={onSubmitReview}>Submit</Button>
          <Button className="btn mx-3 btn-danger" onClick={showForm}>
            Cancel
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};
