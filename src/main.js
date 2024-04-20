import React from 'react';
import Navbar from "./Navbar";
import Table from "./Table";
import Footer from "./Footer";
import Bar from "./bar";

function Main() {
    return (
        <div>

            <div className="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
                {/* Sidebar */}


                {/* Content Area */}

                <div className="flex-1 flex flex-col overflow-hidden" data-theme="dark">
                   <Navbar/>

                    <header className="flex justify-between items-center p-6">
                        <div className="flex items-center space-x-4 lg:space-x-0" >


                            <div>
                                <h1 className="text-2xl font-medium text-gray-800 dark:text-white"></h1>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Your dark mode and other buttons */}
                        </div>
                    </header>
                    <Table/>
                    <main className="flex-1 overflow-x-hidden overflow-y-auto" >
                        <div className="container mx-auto px-6 py-8">
                            <div className="grid place-items-stretch h-96 text-gray-500 dark:text-gray-300 text-xl">

                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Main;
