import React, { useState, useContext } from "react";
import { Context } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import JoblyApi from "../Api";
import "../styles/Jobs.css";

const Jobs = () => {
    const {jobs, setJobs, setIsLoading} = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        setIsLoading(true);
        const newJobs = await JoblyApi.getJobs({ title: searchQuery });
        setIsLoading(false);
        setJobs(newJobs);
        navigate(`/jobs?title=${searchQuery}`);
    };


    return (
        <>
            <div className="search">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Job Title"
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="Jobs">
                {jobs.map(j => 
                    <section className="col-md-8" key={j.id}>
                        <Card>
                            <CardBody className="text-center">
                                <CardTitle>
                                    {j.title}
                                </CardTitle>
                                <CardText>
                                    {j.salary > 0 && <span className="salary">Salary: {j.salary.toLocaleString('en-US')}</span>}
                                    {j.equity > 0 && <span className="equity">Equity: {j.equity}</span>}
                                </CardText>  
                                <Link className="Link" to={`/companies/${j.companyHandle}`} >
                                    {j.companyName}
                                </Link>                    
                            </CardBody>
                        </Card>
                    </section>
                )}
            </div>
        </>
    )
}

export default Jobs;