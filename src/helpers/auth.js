import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../Context";

const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const { user } = useContext(Context);
    
    if (user.username) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/NotAuthorized" replace />;
    }
  };
};

export default withAuthProtection;