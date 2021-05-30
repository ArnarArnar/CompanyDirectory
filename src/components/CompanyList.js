import React from 'react';
import CompanyItem from './CompanyItem';

function CompanyList() {
    const [input, setInput] = React.useState('');
    const [companies, setCompanies] = React.useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = React.useState();
    // eslint-disable-next-line no-unused-vars
    const [favCompanies, setFavCompanies] = React.useState([]);

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

            var raw = JSON.stringify({ name: input });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            try {
                let response = await fetch(apiUrl, requestOptions);
                console.log(`response`, response);
                // Check your response for error this may not be response.error
                if (response.status == 404) {
                    setError(404);
                    setCompanies([]);
                } else {
                    setError('');
                    setCompanies(await response.json());
                }
            } catch (err) {
                setError(err);
            }
            console.log(`companies`, companies);
        };
        const timer = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(timer);
    }, [input]);

    React.useEffect(() => {
        if (!input) {
            setCompanies([]);
        }
    }, [input]);

    const addRemoveFavCompanies = (company) => {
        if (favCompanies.some((favCompany) => favCompany.sn == company.sn)) {
            console.log(`Before`, favCompanies);
            let temp = favCompanies.filter((favCompany) => favCompany.sn !== company.sn);
            setFavCompanies(temp);
        } else {
            setFavCompanies((oldArray) => [...oldArray, company]);
        }
        console.log(`favCompanies`, favCompanies);
    };

    return (
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
                        {companies.length > 0
                            ? companies.map((company) => {
                                  return (
                                      <CompanyItem
                                          key={company.sn}
                                          company={company}
                                          sendDataToParent={addRemoveFavCompanies}
                                      />
                                  );
                              })
                            : null}
                    </div>

                    <div id="search" className="w-full md:w-1/2">
                        <div className="relative w-full my-2 font-bold text-center text-blue800">
                            UPPÁHALDS
                        </div>
                        {favCompanies.length > 0
                            ? favCompanies.map((company) => {
                                  return (
                                      <CompanyItem
                                          key={company.sn}
                                          company={company}
                                          sendDataToParent={addRemoveFavCompanies}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CompanyList;
