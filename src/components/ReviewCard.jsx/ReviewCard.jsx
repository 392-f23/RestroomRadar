import React from "react";
import { Button, Stack, Card } from "react-bootstrap";
import StarRating from "../StarRating/StarRating";
import "./ReviewCard.css";

export const ReviewCard = ({ username, review, rating, photo }) => {
  return (
    <Card className="mb-3 p-1">
      <Stack direction="vertical" className="p-1 reviewcard">
        <div className="d-flex align-items-center">
          {photo ? (
            <img className="review_pic" src={photo} width="30" height="30"></img>
          ) : (
            <div className="photo_placeholder"></div>
          )}
          <div className="review_username">{username}</div>
        </div>

        <Stack direction="vertical">
          <div className="review_rating">
            <StarRating rating={rating} />
          </div>
          <div className="review_text">{review}</div>
        </Stack>
      </Stack>
    </Card>
  );
};
