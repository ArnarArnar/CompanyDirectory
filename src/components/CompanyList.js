import React, { useState, useEffect } from 'react';
import useWindowDimensions from '../utils/windowDimensions';

import { useTranslation } from 'react-i18next';

import RadioGroupModal from './RadioGroupModal';
import CompanyItem from './CompanyItem';
import Loader from './loader';

function CompanyList({ showFavTab }) {
    const [input, setInput] = useState('');
    const [companies, setCompanies] = useState([]);
    const [favCompanies, setFavCompanies] = useState([]);
    const [searchOption, setSearchOption] = useState('BOTH');
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { width } = useWindowDimensions();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setHasError(false);
            try {
                let response = await fetch(
                    `http://localhost:3000/backend/proxy.php?name=${input}&filter=${searchOption}`,
                    { 'Content-Type': 'application/json' }
                );
                if (response.status == 404) {
                    setCompanies([]);
                } else {
                    setCompanies(await response.json());
                }
                setIsLoading(false);
            } catch (err) {
                setHasError(true);
            }
        };
        const timer = setTimeout(() => {
            fetchData();
        }, 100);
        return () => clearTimeout(timer);
    }, [input, searchOption]);

    useEffect(() => {
        if (!input) {
            setCompanies([]);
        }
    }, [input]);

    const handleChange = (event) => {
        let temp = event.target.value.toLowerCase();
        // The API returns 404 if there is space at the end of search query
        if (temp.slice(temp.length - 3) !== '%20') {
            setInput(temp);
        }
    };

    useEffect(() => {
        const temp = localStorage.getItem('favCompanies');
        const loadedFavCompanies = JSON.parse(temp);
        if (loadedFavCompanies) {
            setFavCompanies(loadedFavCompanies);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(favCompanies);
        localStorage.setItem('favCompanies', json);
    }, [favCompanies]);

    const addRemoveFavCompanies = (company) => {
        if (favCompanies.some((favCompany) => favCompany.sn == company.sn)) {
            let temp = favCompanies.filter((favCompany) => favCompany.sn !== company.sn);
            setFavCompanies(temp);
        } else {
            setFavCompanies((oldArray) => [...oldArray, company]);
        }
    };

    // Show both lists in desktop mode, one list in mobile
    const showList = (isFavList) => {
        if (width > 768) {
            return true;
        } else if (isFavList) {
            return showFavTab ? true : false;
        }
        return showFavTab ? false : true;
    };

    const changeSearchOption = (option) => setSearchOption(option);

    const searchOptionDescription = () => {
        switch (searchOption) {
            case 'REGISTERED':
                return t('searchOptionRegistered');
            case 'DEREGISTERED':
                return t('searchOptionDeregistered');
            default:
                return t('searchOptionBoth');
        }
    };

    const isInFavCompanies = (company) => {
        return favCompanies.some((favCompany) => favCompany.sn == company.sn);
    };

    const renderResults = () => {
        if (showList(false)) {
            return (
                <div id="search" className="w-full md:pr-4 md:w-1/2">
                    <div className="relative w-full h-10 my-3 font-bold leading-tight text-center text-blue800">
                        {t('results.label')}
                        <div className="flex items-center justify-center">
                            <span className="pr-1.5 text-xs  font-medium">
                                <div>{searchOptionDescription()}</div>
                            </span>
                            <RadioGroupModal
                                searchOption={searchOption}
                                changeSearchOption={changeSearchOption}
                                style="self-center h-5   px-1.5 text-xs font-bold border border-blue900 rounded  text-blue900 "
                            />
                        </div>
                    </div>
                    {companies.length > 0
                        ? companies.map((company) => {
                              if (isInFavCompanies(company) && width > 768) {
                                  <CompanyItem
                                      key={company.sn}
                                      company={company}
                                      sendDataToParent={addRemoveFavCompanies}
                                      list="favCompany"
                                      favCompanies={favCompanies}
                                  />;
                              } else {
                                  return (
                                      <CompanyItem
                                          key={company.sn}
                                          company={company}
                                          sendDataToParent={addRemoveFavCompanies}
                                          list="results"
                                          favCompanies={favCompanies}
                                      />
                                  );
                              }
                          })
                        : null}

                    {isLoading ? <Loader /> : null}
                    {hasError && <div className="text-center mt-14 text-blue800">{t('error')}</div>}
                </div>
            );
        }
    };

    const renderFavorite = () => {
        if (showList(true)) {
            return (
                <div id="favorite" className="w-full md:pl-4 md:w-1/2">
                    <div className="relative w-full h-10 my-3 font-bold leading-tight text-center text-blue800">
                        {t('favorite.label')}
                    </div>
                    {favCompanies.length > 0
                        ? favCompanies.map((company) => {
                              return (
                                  <CompanyItem
                                      key={company.sn}
                                      company={company}
                                      sendDataToParent={addRemoveFavCompanies}
                                      list="favCompany"
                                      favCompanies={favCompanies}
                                  />
                              );
                          })
                        : null}
                </div>
            );
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-blue500 min-w-screen">
            <div className="container max-w-5xl px-5 mx-auto md:px-8">
                <div className="mt-6 mb-3 md:pt-10">
                    <input
                        onChange={handleChange}
                        type="text"
                        placeholder={t('search.label')}
                        className="relative w-full px-3 py-3 text-xl leading-normal border-0 rounded shadow outline-none bg-grayLight placeholder-blueGray-400 text-blue700 hover:text-blue800 focus:outline-none focus:ring"
                    />
                </div>
                <div className="block mb-32 md:mb-16 md:flex">
                    {renderResults()}
                    {renderFavorite()}
                </div>
            </div>
        </div>
    );
}
export default CompanyList;
