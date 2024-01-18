import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { Context } from "../Context";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    return (
        <section className="col-md-8">
          <Card className="Home-card">
            <CardBody className="text-center">
              <CardTitle className="CardTitle">
                Jobly!
              </CardTitle>
              <CardSubtitle className="CardSubtitle">
                All the jobs in one, convenient place.
              </CardSubtitle>
              {!user.username && (
                        <>
                            <Button className="Button" onClick={() => navigate("/login")}>Login</Button>
                            <Button className="Button" onClick={() => navigate("/signup")}>Signup</Button>
                        </>
              )}
            </CardBody>
          </Card>
        </section>
    )
}

export default Home;