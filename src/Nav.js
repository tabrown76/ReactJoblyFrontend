import React, {useState, useContext} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  NavItem} from 'reactstrap';
import {Context} from "./Context";
import "./styles/Nav.css";

const JoblyNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user, logout} = useContext(Context);
  
    const toggle = () =>  {
        return setIsOpen(!isOpen)
    }

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Job.ly</NavbarBrand>
          {user.username ? (
            <>               
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav style={{marginLeft: "auto"}} navbar>
                  <UncontrolledDropdown nav inNavbar >
                    <DropdownToggle nav caret>
                      {user.username}
                    </DropdownToggle>
                    <DropdownMenu className="custom-dropdown-menu" dark>
                      <DropdownItem>
                        <NavLink href="/profile">Profile</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/companies">Companies</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/jobs">Jobs</NavLink>
                      </DropdownItem>
                      <DropdownItem divider/>
                      <DropdownItem>
                        <NavLink onClick={logout}>Logout</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>            
            </>
          ) : (
            <div className="right-nav-links">
              <NavItem>
                <NavLink className="NavLink" href="/login" color="dark">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="NavLink" href="signup" color="dark">Signup</NavLink>
              </NavItem>
            </div>
          )          
          }
        </Navbar>
      </div>
    );
}

export default JoblyNav;