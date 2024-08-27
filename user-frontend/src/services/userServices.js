import { isVAT } from "validator";




export function userLoginValidation(details){
    try {
        
    } catch (error) {
        
    }
}



export function registerValidation(details){
    const {name , email , phoneNumber , password , confirmPassword ,isVerify} = details
    const errors = {};

    if (!name.trim()) {
      errors.name = "*Name is required";
    }

    if (!email.trim()) {
      errors.email = "*Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "*Invalid email address";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "*Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "*Invalid phone number. Must be 10 digits.";
    }

    if (!password.trim()) {
      errors.password = "*Password is required";
    } else if (password.length < 6) {
      errors.password = "*Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "*Please confirm your password";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "*Passwords do not match";
    }
    if(!isVerify){
      errors.email = "*Verify your email"
    }
    
    return errors
}




export function loginValidation(details) {
  const { email, password } = details;
  const errors = {};
  console.log('not problem')

  // Check if email is defined and not empty
  if (email === undefined || email === null || !email.trim()) {
    errors.email = "*Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "*Invalid email address";
  }

  // Check if password is defined and not empty
  if (password === undefined || password === null || !password.trim()) {
    errors.password = "*Password is required";
  } else if (password.length < 6) {
    errors.password = "*Password must be at least 6 characters";
  }

  return errors;
}

