import React, { useContext } from "react";
import {Routes, Route} from "react-router-dom";
import { Spinner } from "reactstrap";
import { Context } from "./Context";
import Home from "./routes/Home";
import Companies from "./routes/Companies";
import Company from "./routes/Company";
import Jobs from "./routes/Jobs";
import Job from "./routes/Job";
import LoginForm from "./routes/LoginForm";
import SignupForm from "./routes/SignupForm";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import NotAuthorized from "./routes/NotAuthorized";
import withAuthProtection from "./helpers/auth";
import "./styles/Routes.css";

const JoblyRoutes = () => {
    const {isLoading} = useContext(Context);
    const ProtectedCompanies = withAuthProtection(Companies);
    const ProtectedCompany = withAuthProtection(Company);
    const ProtectedJobs = withAuthProtection(Jobs);
    const ProtectedJob = withAuthProtection(Job);
    const ProtectedProfile = withAuthProtection(Profile);

    if(isLoading){
      return ( 
        <div className="Spinner" > 
          <Spinner className="Spinner-inner" /> 
        </div> 
      ); 
    }

    return (
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<ProtectedCompanies />} />
            <Route path="/companies/:company" element={<ProtectedCompany />} />
            <Route path="/companies/:company/jobs/:jobId" element={<ProtectedJob />} />
            <Route path="/jobs" element={<ProtectedJobs />} />
            <Route path="/jobs/:jobId" element={<ProtectedJob />} />
            <Route path="/profile" element={<ProtectedProfile />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/NotAuthorized" element={<NotAuthorized />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
      </main>
    )
}

export default JoblyRoutes;