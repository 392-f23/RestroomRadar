import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function RestroomCard({name, address, busy, rating, pricing, distance}) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name} - {busy}</Card.Title>
        <Card.Text>
          {address} ({distance})
        </Card.Text>
        <Card.Text>
          {pricing}
        </Card.Text>
        <Card.Text>
          {rating}
        </Card.Text>
        <Button variant="primary">Reviews</Button>
      </Card.Body>
    </Card>
  );
}

export default RestroomCard;
