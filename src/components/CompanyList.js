import React from 'react';

import CompanyItem from './CompanyItem';

function CompanyList() {
    const [input, setInput] = React.useState('');
    const [companies, setCompanies] = React.useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = React.useState();

    const handleChange = (event) => {
        let temp = encodeURIComponent(event.target.value).toLowerCase();
        if (temp.slice(temp.length - 3) !== '%20') {
            setInput(temp);
        }
    };

    React.useEffect(() => {
        (async () => {
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
        })();
        console.log('companies', companies);
    }, [input]);

    React.useEffect(() => {
        if (!input) {
            setCompanies([]);
        }
    }, [input]);

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
                        <CompanyItem />
                    </div>

                    <div id="search" className="w-full md:w-1/2">
                        <div className="relative w-full my-2 font-bold text-center text-blue800">
                            Uppáhalds
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CompanyList;
