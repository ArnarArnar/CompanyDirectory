import React from 'react';
import starThin from '../assets/img/star-thin.svg';

export default function CompanyItem({ company }) {
    var splitAddress;
    if (company.address.includes(',')) {
        splitAddress = company.address.split(',');
    } else {
        splitAddress = company.address.split('  ');
    }

    return (
        <div className="w-full ">
            <div id="card" className="flex px-3 py-2 mb-2 bg-gray-200 rounded-lg">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex flex-row ">
                        {/* <div className="self-center flex h-0 p-1.5 bg-green-500 border-2 rounded-full mr-2"></div> */}
                        <div className="pr-1 pt-0.5 text-lg font-bold text-blue700">
                            {company.name}
                        </div>
                    </div>
                    <div className="flex justify-between mt-1 ">
                        <div className="flex flex-col justify-end text-blue700">
                            <div> {splitAddress[0]}</div>
                            <div> {splitAddress[1]}</div>

                            <div>
                                <span className="font-medium">kt: </span>
                                <span>{company.sn}</span>
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
