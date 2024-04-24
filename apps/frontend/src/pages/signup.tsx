import { useState } from "react";
import TextInput from "../components/textInput";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpLogin } from "../util/signup-login";


export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signupOrLogin = useSignUpLogin();

    return (
        <div className="bg-pink-200 flex flex-col float-left p-6 fixed top-0 left-0 w-full h-full space-y-4">
            <h1 className="font-serif text-4xl float-left"> 
                Sign Up </h1>
            <TextInput 
                title='Username'
                value={username}
                placeholder='Enter username'
                onChange={setUsername}
                isPassword={false}
            />
            <TextInput 
                title='Password'
                value={password}
                placeholder='Enter password'
                onChange={setPassword}
                isPassword={true}
            />
            <button
                type="button"
                className="btn w-[300px] h-10 bg-purple-500 rounded"
                onClick={async () => {
                    try {
                        const response = await signupOrLogin('/account/signup', username, password);
                        if (response === 200) {
                            navigate('/');
                        }
                    } catch (error) {
                        // eslint-disable-next-line no-alert
                        alert(error.message);
                    }
                }}>
                Sign Up
            </button>
            <div>
                <p> Already have an account? </p>
                <Link className="font-semibold text-purple-500" to="/login"> Log in here! </Link>
            </div>
        </div>
    );
}