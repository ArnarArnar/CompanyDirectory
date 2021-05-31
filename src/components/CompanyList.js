import React from 'react';
import useWindowDimensions from '../utils/windowDimensions';
import { useTranslation } from 'react-i18next';

import RadioGroupModal from './RadioGroupModal';
import CompanyItem from './CompanyItem';

function CompanyList({ showFavTab }) {
    const [input, setInput] = React.useState('');
    const [companies, setCompanies] = React.useState([]);
    // eslint-disable-next-line no-unused-vars
    const [searchOption, setSearchOption] = React.useState('BOTH');
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = React.useState();
    // eslint-disable-next-line no-unused-vars
    const [favCompanies, setFavCompanies] = React.useState([]);
    const { width } = useWindowDimensions();
    const { t } = useTranslation();

    const handleChange = (event) => {
        let temp = event.target.value.toLowerCase();
        if (temp.slice(temp.length - 3) !== '%20') {
            setInput(temp);
        }
    };

    React.useEffect(() => {
        const temp = localStorage.getItem('favCompanies');
        const loadedFavCompanies = JSON.parse(temp);
        if (loadedFavCompanies) {
            setFavCompanies(loadedFavCompanies);
        }
    }, []);

    React.useEffect(() => {
        const json = JSON.stringify(favCompanies);
        localStorage.setItem('favCompanies', json);
    }, [favCompanies]);

    React.useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `http://localhost:3010/backend.php`;

            var myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');

            var raw = JSON.stringify({ name: input, filter: searchOption });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            try {
                let response = await fetch(apiUrl, requestOptions);
                //console.log(`response`, await response.json());
                // Check your response for error this may not be response.error
                if (response.status == 404) {
                    console.log('if (response.status == 404) {');
                    setError(404);
                    setCompanies([]);
                } else {
                    console.log('ELSE if (response.status == 404) {');
                    setError('');
                    let data = await response.json();
                    setCompanies(data);
                }
            } catch (err) {
                setError(err);
            }
        };
        const timer = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(timer);
    }, [input, searchOption]);

    React.useEffect(() => {
        if (!input) {
            console.log(`    React.useEffect(() => {
        if (!input) `);
            setCompanies([]);
        }
    }, [input]);

    const addRemoveFavCompanies = (company) => {
        console.log(window.innerHeight);

        if (favCompanies.some((favCompany) => favCompany.sn == company.sn)) {
            let temp = favCompanies.filter((favCompany) => favCompany.sn !== company.sn);
            setFavCompanies(temp);
        } else {
            setFavCompanies((oldArray) => [...oldArray, company]);
        }
    };

    const isInFavCompanies = (company) => {
        return favCompanies.some((favCompany) => favCompany.sn == company.sn);
    };

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
                <div className="block md:flex ">
                    {showList(false) ? (
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
                                        style="self-center h-5  shadow px-1.5 text-xs font-black  rounded bg-grayLight text-blue900 "
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
                        </div>
                    ) : null}
                    {showList(true) ? (
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
                    ) : null}
                </div>
            </div>
        </div>
    );
}
export default CompanyList;
