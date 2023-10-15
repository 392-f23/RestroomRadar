import './Showmore.css'

const ShowMoreButton = ({ onClick }) => {
  const[showMore, setShowmore]=useState("");  
  return (
      <button onClick={onClick} className="show-more-button">
        Show More
      </button>
    );
  };
  
  export default Showmore;