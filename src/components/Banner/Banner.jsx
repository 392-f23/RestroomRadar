import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Banner.css'

function Banner() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary banner-container">
      <h1 className='header'>RestroomRadar</h1>     
    </Navbar>
  );
}

export default Banner;