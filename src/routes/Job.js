import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";
import JoblyApi from "../Api";
import { Context } from "../Context";

const Job = () => {
    const {jobId} = useParams();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({});
    const [hasApplied, setHasApplied] = useState(false);
    const {setIsLoading, user} = useContext(Context)

  
    useEffect(() => {
      async function fetchJobData() {
        try{
            setIsLoading(true);
            
            const data = await JoblyApi.getJob(jobId);
            setJobData(data);

            const res = await JoblyApi.getUserJob(user.username, jobId);
            setHasApplied(res.hasApplied);

            setIsLoading(false);
        } catch(e){
            console.error(`Error fetching job:`, e);
            navigate('/NotFound');
        }
      }

      fetchJobData();
    }, [jobId, setIsLoading, user.username, navigate]);

    const handleClick = async () => {
        try {
            await JoblyApi.postUserJob(user.username, jobId);
            navigate(`/companies/${jobData.company.handle}`)
        } catch (e) {
            console.error(`Error applying:`, e);
        }
    }

    return (
        <>
            <Card className="Card">
                <CardBody className="text-center CardBody">
                    <CardTitle className="CardTitle">
                        {jobData.title}
                    </CardTitle>
                    <CardText className="CardText">
                        <span style={{display: 'block'}}>{jobData.company?.name}</span>
                        {jobData.salary > 0 && <span className="salary">Salary: {jobData.salary.toLocaleString('en-US')}</span>}
                        {jobData.equity > 0 && <span className="equity">Equity: {jobData.equity}</span>}
                    </CardText>  
                    <Button 
                        className="Button" 
                        onClick={handleClick} 
                        disabled={hasApplied}>
                            {hasApplied ? 'Applied' : 'Apply!'}
                    </Button>                                      
                    <Button 
                        className="Button" 
                        onClick={() => navigate(`/companies/${jobData.company.handle}`)}>
                            Back
                    </Button>                                      
                </CardBody>
            </Card>
        </>
    )
}

export default Job;