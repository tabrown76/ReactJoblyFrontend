import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyApi from './Api';
import {jwtDecode} from "jwt-decode";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const [companies, jobs] = await Promise.all([
                JoblyApi.getCompanies(),
                JoblyApi.getJobs()
            ])
            setCompanies(companies);
            setJobs(jobs);
            setIsLoading(false);
        }

        fetchData();
    }, []);  
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        }
    }, []);

    const postData = async(formData) => {
        try {
            const token = await JoblyApi.registerUser(formData);
            const decodedToken = jwtDecode(token);
            
            setToken(token);
            localStorage.setItem('token', token);
            setUser(decodedToken);
        } catch(e) {
            console.error(`Error:`, e);
        }
    }

    const logout = () => {
        setToken("");
        localStorage.clear();
        setUser({});
        navigate('/');
    }

    const login = async(formData) => {
        try {
            const token = await JoblyApi.loginUser(formData);
            const decodedToken = jwtDecode(token);

            setToken(token);
            localStorage.setItem('token', token);
            setUser(decodedToken)
        } catch(e) {
            if(e[0] === "Request failed with status code 401"){
                navigate('/NotAuthorized');
            }
            console.error(`Error:`, e);
        }
    }

    return (
        <Context.Provider value={{ 
            isLoading, 
            setIsLoading, 
            companies, 
            setCompanies, 
            jobs, 
            setJobs,
            postData,
            user,
            token,
            logout,
            login,
        }}>
            {children}
        </Context.Provider>
    );
};
