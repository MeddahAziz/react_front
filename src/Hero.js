import React from "react";
import { Link } from 'react-router-dom';

function Hero () {


    return (
    <div className="hero min-h-screen"
         style={{backgroundImage: 'url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                    Welcome to the future of finance! Buy, sell, and trade cryptocurrencies with ease. Get started today and unlock the potential of the crypto market.</p>
                <Link to="/login" className="text-blue-500"><button className="btn btn-primary"> Get Started </button></Link>
            </div>
        </div>
    </div>
    );

}

export default Hero;