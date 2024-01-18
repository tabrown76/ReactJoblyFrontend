import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Context} from "../Context";
import JoblyApi from "../Api";
import "../styles/Forms.css"

const Profile = () => {
    const {user} = useContext(Context);
    const [userData, setUserData] = useState({})
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        async function fetchData(){
            const fetchedUser = await JoblyApi.getUser(user.username);
            setUserData(fetchedUser);
            setFormData({
                firstName: fetchedUser.firstName || '',
                lastName: fetchedUser.lastName || '',
                email: fetchedUser.email || '',
                password: ''
            });
        }
        
        fetchData();
    }, [user.username])
      
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFields = {};
    
        for (const key in formData) {
            if (formData[key] !== userData[key] && formData[key] !== '') {
                updatedFields[key] = formData[key];
            }
        }
    
        try {
            if (Object.keys(updatedFields).length > 0) {
                await JoblyApi.patchUser(user.username, updatedFields);
            } else {
                console.log("No changes to update");
            }
        } catch (e) {
            console.error(`Error updating user:`, e);
        }
    }    

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input 
                    className="Form-input text-input" 
                    type="text" 
                    name="firstName" 
                    id="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input 
                    className="Form-input text-input" 
                    type="text" 
                    name="lastName" 
                    id="lastName" 
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input 
                    className="Form-input" 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input 
                    className="Form-input" 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    onChange={handleChange} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </>
    )
}

export default Profile;