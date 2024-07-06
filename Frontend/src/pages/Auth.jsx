import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { Office } from "../assets";
import { SignUp } from "../components";

const Auth = () => {
  const user = useSelector((state) => state.user); // Updated selector to access user object correctly
  const [open, setOpen] = useState(true);
  const location = useLocation();

  let from = location?.state?.from?.pathname || "/";

  if (user && user.token) {
    return <Navigate to={from} replace />; // Use Navigate component
  }

  return (
    <div className='w-full'>
      <img src={Office} alt='Office' className='object-contain' />
      <SignUp open={open} setOpen={setOpen} />
    </div>
  );
};
export default Auth;


