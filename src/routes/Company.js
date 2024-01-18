import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle, CardLink, Button } from "reactstrap";
import JoblyApi from "../Api";
import { Context } from "../Context";
import "../styles/Company.css";

const Company = () => {
    const {company} = useParams();
    const navigate = useNavigate();
    const [companyData, setCompanyData] = useState({});
    const [hasApplied, setHasApplied] = useState({});
    const {setIsLoading, user} = useContext(Context)

    useEffect(() => {
      async function fetchCompanyData() {
        try{
            setIsLoading(true);
            const data = await JoblyApi.getCompany(company);
            setCompanyData(data);
        } catch(e){
            console.error(`Error fetching company:`, e)
            navigate('/NotFound');
        }
      }

      fetchCompanyData();
    }, [company, setIsLoading, navigate]);

    useEffect(() => {
        async function fetchJobData() {
          if(companyData.jobs){
            const appliedStatus = {};
            for(const job of companyData.jobs){
                try{
                    const res = await JoblyApi.getUserJob(user.username, job.id);
                    appliedStatus[job.id] = res.hasApplied;
                } catch(e){
                    console.error(`Error fetching job:`, e);
                    navigate('/NotFound');
                }
            }
            setHasApplied(appliedStatus)
          }
          setIsLoading(false);
        }
  
        fetchJobData();
      }, [setIsLoading, companyData, user.username, navigate]);

    const handleClick = async (jobId) => {
        try {
            await JoblyApi.postUserJob(user.username, jobId);
            navigate(`/companies/${company}`)
        } catch (e) {
            console.error(`Error applying:`, e);
        }
    }

    return (
        <>
            <Card className="Card">
                <CardBody className="text-center CardBody">
                    <CardTitle className="CardTitle">
                        {companyData.name}
                    </CardTitle>
                    <CardText className="CardText">
                        {companyData.description}
                    </CardText>  
                    {companyData.jobs?.map(j =>
                        <Card className="Card" key={j.id}>
                            <CardLink className="CardLink" href={`${company}/jobs/${j.id}`}>
                                <CardTitle>
                                    {j.title}
                                </CardTitle>
                            </CardLink>
                            <Button 
                                className="Button" 
                                onClick={() => handleClick(j.id)} 
                                disabled={hasApplied[j.id]}>
                                    {hasApplied[j.id] ? 'Applied' : 'Apply!'}
                            </Button>                                      
                        </Card>
                    )}                     
                </CardBody>
            </Card>
        </>
    )
}

export default Company;