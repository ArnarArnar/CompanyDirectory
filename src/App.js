import React from 'react';
import Header from './components/Header';
import CompanyList from './components/CompanyList';
import MobileNav from './components/MobileNav';

function App() {
    const [showFavTab, setShowFavTab] = React.useState(false);

    const toggleTab = (action) => {
        console.log(`action`, action);
        setShowFavTab(action);
    };

    return (
        <>
            <Header />
            <CompanyList showFavTab={showFavTab} />
            <MobileNav toggleTab={toggleTab} showFavTab={showFavTab} />
        </>
    );
}
export default App;
