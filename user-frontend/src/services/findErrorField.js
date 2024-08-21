export function findErrorField(error){
    if(error.message == 'user name is required.'){
        return 'name'
    }else if(error.message == 'User already exists' || error.message == 'invalid email or email not found'){
        return 'email'
    }else if(error.message == 'Password must be at least 6 characters long.'){
        return 'password'
    }else if(error.message == 'Passwords do not match.'){
        return 'confirmPassword '
    }
}

