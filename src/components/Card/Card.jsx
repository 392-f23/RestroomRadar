import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import StarRating from "../StarRating/StarRating";
import "./Card.css";

function RestroomCard({ result, openModal, setSelected }) {
  const name = result.name;
  const address = result.address;
  const distance = result.distance;
  const busy = result.busyLevel;
  const rating = result.rating;
  const pricing = result.priceLevel;

  const mapLink =
    "https://www.google.com/maps/dir/41.9047103,-87.6360605/Starbucks,+1230+W+Scott+St,+Chicago,+IL+60610/@41.9043209,-87.6358348,18.01z/data=!4m9!4m8!1m0!1m5!1m1!1s0x880fd348a269abf1:0x79a6d1743cd7a50f!2m2!1d-87.6347694!2d41.9048091!3e2?entry=ttu";

  const showReviews = () => {
    setSelected(result);
    openModal();
  };

  const buttonVariant = () => {
    if (busy === "Not Busy") {
      return "success";
    } else if (busy === "Busier than usual") {
      return "warning";
    } else if (busy === "Busy") {
      return "danger";
    }
  };

  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title>
          <a className="name-link" href={mapLink} target="_blank">
            {name}
          </a>
        </Card.Title>
        <Button
          className="busy-label"
          variant={buttonVariant()}
          size="sm"
          disabled
        >
          {busy}
        </Button>
        <Card.Text>
          {address} ({distance})
        </Card.Text>
        <Card.Text>{pricing}</Card.Text>
        <div className="flex">
          <StarRating rating={rating} />
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
      </Card.Body>
    </Card>
  );
}

export default RestroomCard;
