

export function registerValidation(details){
    const {firstName , lastName , email , phoneNumber , password , confirmPassword ,isVerify} = details
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "*First Name is required";
    }
    if (!lastName.trim()) {
      errors.lastName = "*Last Name is required";
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


export function passResetValidation(details) {
  const errors = {};
  console.log("passReset",details);
  console.log("hi, im in passResetValidation");
  
  

  const {password} = details
  console.log("passs",password);
  

  // Check if password is defined and not empty
  if (password === undefined || password === null || !password.trim()) {
    errors.password = "*Password is required";
  } else if (password.length < 6) {
    errors.password = "*Password must be at least 6 characters";
  }

  return errors;
}

