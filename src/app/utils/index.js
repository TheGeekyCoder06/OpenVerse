export const signupFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        type: 'text',
        placeholder: 'Enter your user name',
        required: true,
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true, 
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true,
    },
]

export const signUpInitialFormData = {
    userName: '',
    email: '',
    password: '',
}

export const loginFormControls = [
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true, 
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true,
    }
]

export const initialLoginFormData = {
    email: '',
    password: '',
}