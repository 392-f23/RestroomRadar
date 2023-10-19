import React from "react";
import { Button, Stack } from "react-bootstrap";
import StarRating from "../StarRating/StarRating";
import "./ReviewCard.css";

export const ReviewCard = ({ username, review, rating, photo }) => {
  return (
    <Stack direction="horizontal" className="p-1 ">
      {photo ? (
        <img className="review_pic" src={photo} width="50" height="50"></img>
      ) : (
        <div className="photo_placeholder"></div>
      )}

      <Stack direction="vertical" className="p-2">
        <div className="review_username">{username}</div>
        <div className="review_text">{review}</div>
        <div className="review_rating">
          <StarRating rating={rating} />
        </div>
      </Stack>
    </Stack>
  );
};
