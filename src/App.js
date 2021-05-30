import React from 'react';

function App() {
    const [input, setInput] = React.useState('');
    const [companies, setCompanies] = React.useState([]);
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
        <div className="container mt-10 font-sans">
            <div className="pt-10 mb-3">
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Placeholder"
                    className="relative w-full px-3 py-3 text-sm bg-white border-0 rounded shadow outline-none placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                />
            </div>
            <>
                {companies.length > 0
                    ? companies.map((item) => {
                          return (
                              <div key={item.ssn}>
                                  <div>Name: {item.name}</div>
                                  <div>Address: {item.address}</div>
                                  <div>Kt: {item.sn}</div>
                              </div>
                          );
                      })
                    : null}
                {error === 404 ? (
                    <div>Ekki fleiri niðurstöður með þessum leitarskilyrðum</div>
                ) : null}
            </>
        </div>
    );
}
export default App;
