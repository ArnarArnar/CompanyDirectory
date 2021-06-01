import React from 'react';
import { useTranslation } from 'react-i18next';
import starThin from '../assets/img/star-thin.svg';
import starFull from '../assets/img/star-full.svg';

import useWindowDimensions from '../utils/windowDimensions';

export default function CompanyItem({ company, sendDataToParent, list, favCompanies }) {
    const { t } = useTranslation();
    const { width } = useWindowDimensions();

    var splitAddress;
    if (company.address.includes(',')) {
        splitAddress = company.address.split(',');
    } else {
        splitAddress = company.address.split('  ');
    }

    const isFavored = () => {
        if (list == 'favCompany') {
            return true;
        } else if (width < 768 && favCompanies.some((favCompany) => favCompany.sn == company.sn)) {
            return true;
        }
    };

    return (
        <div className="w-full ">
            <div id="card" className="flex px-4 py-2 mb-2 bg-gray-200 rounded-lg">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex flex-row justify-between">
                        <div className="pr-1 pt-0.5 text-lg font-bold text-blue700">
                            {company.name}
                        </div>
                        <div className="text-sm font-medium leading-7 text-blue700">
                            {company.active ? '' : `${t('deregistered.label')}`}
                        </div>
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
                            <div className="relative self-center mb-1 overflow-hidden rounded pb-14 pr-14">
                                {isFavored() ? (
                                    <img
                                        alt="StarFull"
                                        className="absolute bottom-0 right-0 object-cover w-full"
                                        src={starFull}
                                    />
                                ) : (
                                    <img
                                        alt="StarThin"
                                        className="absolute bottom-0 right-0 object-cover w-full"
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
