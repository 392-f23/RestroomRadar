import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import StarRating from "../StarRating/StarRating";
import "./Card.css";
import { getRating, getReviewCount } from "../../utilities/firebase";

function RestroomCard({ result, openModal, setSelected }) {
  const name = result.name;
  const address = result.address;
  const distance = result.distance;
  const busy = result.operational;
  const rating = getRating(result.id);
  const reviewCount = getReviewCount(result.id);
  const type = result.types[0];

  const mapLink = "https://www.google.com/maps/place/?q=place_id:" + result.id;

  const showReviews = () => {
    setSelected(result);
    openModal();
  };

  const buttonVariant = () => {
    if (busy === "OPERATIONAL") {
      return "btn btn-success";
    } else if (busy === "CLOSED_TEMPORARILY") {
      return "btn btn-danger";
    }
  };

  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title>
          <p>{name}</p>
        </Card.Title>
        <Button
          className="busy-label"
          variant={buttonVariant()}
          size="sm"
          disabled
        >
          {type}
        </Button>
        <Card.Text>
          <a className="name-link" href={mapLink} target="_blank">
            {address}
          </a>
          <p>({distance} km)</p>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white">
        <div className="flex">
          {rating !== 0 ? (
            <StarRating rating={rating} reviewCount={reviewCount} />
          ) : (
            "No reviews currently."
          )}
          <Button variant="primary" onClick={showReviews}>
            Reviews
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat-right-text review"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
              <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default RestroomCard;
