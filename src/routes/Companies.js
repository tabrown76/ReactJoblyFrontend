import React, { useState, useContext } from "react";
import { Context } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import JoblyApi from "../Api";
import "../styles/Companies.css";


const Companies = () => {
    const {companies, setCompanies, setIsLoading} = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        setIsLoading(true);
        const newCompanies = await JoblyApi.getCompanies({ name: searchQuery });
        setIsLoading(false);
        setCompanies(newCompanies);
        navigate(`/companies?name=${searchQuery}`);
    };


    return (
        <>
            <div className="search">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Company Name"
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="Companies">
                {companies.map(c => 
                    <section className="col-md-8" key={c.handle}>
                        <Card>
                            <CardBody className="text-center">
                                <CardTitle>
                                    {c.name}
                                </CardTitle>
                                <CardText>
                                    {c.description}
                                </CardText>   
                                <Link className="Link" to={`/companies/${c.handle}`} >
                                    View More
                                </Link>                    
                            </CardBody>
                        </Card>
                    </section>
                )}
            </div>
        </>
    )
}

export default Companies;
