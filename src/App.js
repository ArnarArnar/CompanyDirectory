import React from 'react';
import Header from './components/Header';

import starThin from './assets/img/star-thin.svg';
import MobileNav from './components/MobileNav';

function App() {
    const handleChange = () => true;

    return (
        <>
            <Header />
            <div className="flex justify-center min-h-screen bg-blue500 min-w-screen">
                <div className="container max-w-5xl px-5 mx-auto">
                    <div className="pt-10 mb-3">
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="Leit"
                            className="relative w-full px-3 py-3 text-xl border-0 rounded shadow outline-none bg-grayLight placeholder-blueGray-400 text-blue700 focus:outline-none focus:ring"
                        />
                    </div>
                    <div className="block md:flex ">
                        <div id="search" className="w-full md:pr-2 md:w-1/2">
                            <div className="relative w-full my-2 font-bold text-center text-blue800">
                                NIÐURSTÖÐUR
                            </div>
                            <div className="w-full ">
                                <div id="card" className="flex p-4 bg-gray-200 rounded-lg">
                                    <div className="flex flex-col justify-between w-full ">
                                        <div className="flex flex-row ">
                                            <div className="self-center flex h-0 p-1.5 bg-green-500 border-2 rounded-full mr-2"></div>
                                            <div className="pr-1 pt-0.5 text-lg font-bold text-blue700">
                                                Stokkur Software ehf.
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-1 ">
                                            <div className="text-blue700">
                                                <div>Hafnarbraut 11</div>
                                                <div>200 Kópavogur</div>
                                                <div>
                                                    <span className="font-medium">kt: </span>
                                                    <span>3342423543543</span>
                                                </div>
                                            </div>

                                            <div
                                                id="favoriteContainer"
                                                className="flex h-full ml-2">
                                                <div className="relative self-center pb-16 pr-16 overflow-hidden rounded">
                                                    <img
                                                        alt="Test"
                                                        className="absolute bottom-0 right-0 object-cover w-11/12 h--11/12 "
                                                        src={starThin}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="search" className="w-full md:w-1/2">
                            <div className="relative w-full my-2 font-bold text-center text-blue800">
                                Uppáhalds
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileNav />
        </>
    );
}
export default App;
