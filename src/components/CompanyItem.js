import React from 'react';
import starThin from '../assets/img/star-thin.svg';

export default function CompanyItem() {
    return (
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

                        <div id="favoriteContainer" className="flex h-full ml-2">
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
    );
}
