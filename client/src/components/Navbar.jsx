import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Auth from '../../utils/auth';
import '../css/navbar.css';
import { useState, useEffect } from 'react';

const AppNavbar = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });


    return (
        <>
        {windowWidth > 756 ? (
        <Navbar className='Navbar'>
            <Container fluid className='p-0 navbar-container'>
                <Navbar.Brand as={Link} to='/'>
                    Judge a Book
                </Navbar.Brand>
                <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
                    <Nav>
                        {Auth.loggedIn() ? (
                            <>
                                <Nav.Link as={Link} to='/feed'>Feed</Nav.Link>
                                <Nav.Link as={Link} to='/library'>Library</Nav.Link>
                                <Nav.Link as={Link} to='/settings'>Settings</Nav.Link>
                                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to='/signup'>Sign In</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        ): (
            <nav className="navbar w-100">
                <div className="container-fluid">
                    <Navbar.Brand as={Link} to='/'>
                        Judge a Book
                    </Navbar.Brand>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Judge A Book</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link 
                                        className="nav-link active" 
                                        aria-current="page" 
                                        to='/feed'
                                    >   Feed
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        className="nav-link active" 
                                        aria-current="page" 
                                        to='/library'
                                    >
                                        Library
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        className="nav-link active" 
                                        aria-current="page" 
                                        to='/setting'
                                    >
                                        Setting
                                    </Link>
                                </li>
                                {Auth.loggedIn() ? (
                                    <li className="nav-item">
                                        <Link 
                                            className="nav-link active" 
                                            aria-current="page" 
                                            onClick={Auth.logout}
                                        >
                                            Logout
                                        </Link>
                                </li>
                                ): (
                                    <li className="nav-item">
                                        <Link 
                                            className="nav-link active" 
                                            aria-current="page" 
                                            to='/signup'
                                        >
                                            Sign Up
                                        </Link>
                                </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )}
        
        </>
    );
}

export default AppNavbar;
