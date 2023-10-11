import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReactStars from "react-rating-stars-component";

export const ReviewForm = () => {

    const ratingChanged = (newRating) => {
  console.log(newRating);
};
 

  return (
    <Form className="p-3">
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Review</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Rating</Form.Label>
        {/* <Form.Control type="email" placeholder="name@example.com" /> */}
        <div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />
        </div>

        <Button>Submit</Button>
         <Button>Cancel</Button>
      </Form.Group>
     
    </Form>
  );
};
