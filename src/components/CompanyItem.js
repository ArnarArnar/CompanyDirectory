import React from 'react';
import starThin from '../assets/img/star-thin.svg';
import starFull from '../assets/img/star-full.svg';

export default function CompanyItem({ company, sendDataToParent, list, favCompanies }) {
    var splitAddress;
    if (company.address.includes(',')) {
        splitAddress = company.address.split(',');
    } else {
        splitAddress = company.address.split('  ');
    }

    const isFavored = () => {
        console.log(`list`, list);
        console.log(`favCompanies`, favCompanies);
        if (list == 'favCompany') {
            return true;
        } else if (favCompanies.some((favCompany) => favCompany.sn == company.sn)) {
            return true;
        }
    };

    return (
        <div className="w-full ">
            <div id="card" className="flex px-3 py-2 mb-2 bg-gray-200 rounded-lg">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex flex-row justify-between">
                        <div className="pr-1 pt-0.5 text-lg font-bold text-blue700">
                            {company.name}
                        </div>
                        <div
                            className={`self-center flex h-0 p-1.5 mr-1 border-2 rounded-full  ${
                                company.active ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                    </div>
                    <div className="flex justify-between mt-1 ">
                        <div className="flex flex-col justify-end h-16 text-blue700">
                            <div> {splitAddress[0]}</div>
                            <div> {splitAddress[1]}</div>

                            <div>
                                <span className="font-medium">kt: </span>
                                <span>{company.sn}</span>
                            </div>
                        </div>

                        <button
                            id="favoriteContainer"
                            className="flex h-full ml-2"
                            onClick={() => {
                                sendDataToParent(company);
                            }}>
                            <div className="relative self-center pb-16 pr-16 mb-1 overflow-hidden rounded">
                                {isFavored() ? (
                                    <img
                                        alt="StarFull"
                                        className="absolute bottom-0 right-0 object-cover w-11/12 h--11/12 "
                                        src={starFull}
                                    />
                                ) : (
                                    <img
                                        alt="StarThin"
                                        className="absolute bottom-0 right-0 object-cover w-11/12 h--11/12 "
                                        src={starThin}
                                    />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
