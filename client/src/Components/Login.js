import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from 'react-daisyui'
import 'react-daisyui'


function Login() {
    //Fetch the user states from UserContext
    const { setUser, setIsLoggedIn } = useContext(UserContext);
    //Use Navigate
    const navigate = useNavigate();


    //Two states for each form.
    const [loginFormState, setLoginFormState] = useState({
        username: "",
        password: "",
    })
    const [newAccountFormState, setNewAccountFormState] = useState({
        new_username: "",
        new_password: "",
        verify_password: "",
        email: ""
    })

    const { username, password } = loginFormState;
    const { new_username, new_password, verify_password, email } = newAccountFormState;


    // Login

    function handleLoginSubmit(e) {
        e.preventDefault();

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(loginFormState)
        }

        fetch("/login", configObj)
            .then(res => {
                if (res.ok) {
                    res.json().then((data) => {
                        setUser(data);
                        setIsLoggedIn(true);
                        navigate('/your-lessons');
                    })
                } else {
                    navigate('/login')
                }
            })
    }

    function handleLoginChange(e) {
        setLoginFormState({ ...loginFormState, [e.target.name]: e.target.value })
    }



    // Create New Account
    // TODO: error handling to make sure passwords match

    function handleNewAccountSubmit(e) {
        e.preventDefault();
        fetch(`/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newAccountFormState)
        })
            .then(res => {
                if (res.ok) {
                    res.json().then((data) => {
                        setUser(data);
                        setIsLoggedIn(true);
                        navigate('/your-lessons');
                    })
                } else {
                    navigate('/login')
                }

            })
    }

    function handleNewAccountChange(e) {
        setNewAccountFormState({ ...newAccountFormState, [e.target.name]: e.target.value })
    }
    return (
        <>
        
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        {/* TODO: Logo */}
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>


                    <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input id="username" name="username" value={username} onChange={handleLoginChange} type="username" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" value={password} onChange={handleLoginChange}type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>

                        {/* Forgot your password section */}

                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label for="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                            </div>
                        </div> */}

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>

{/* ///////////////////////// Sign Up /////////////////////// */}
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a New Account</h2>
                    <form onSubmit={handleNewAccountSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="new_username" className="sr-only">Username</label>
                                <input id="new_username" name="new_username" value={new_username} onChange={handleNewAccountChange} type="new_username" autoComplete="new_username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" name="email" value={email} onChange={handleNewAccountChange} type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
                            </div>
                            <div>
                                <label htmlFor="new_password" className="sr-only">Password</label>
                                <input id="new_password" name="new_password" value={new_password} onChange={handleNewAccountChange}type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                            <div>
                                <label htmlFor="verify_password" className="sr-only">Password</label>
                                <input id="verify_password" name="verify_password" value={verify_password} onChange={handleNewAccountChange}type="password" autoComplete="verify-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Verify Password" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Create an Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;