import React, { Suspense } from 'react';
import Header from './components/Header';
import CompanyList from './components/CompanyList';
import MobileNav from './components/MobileNav';
import './i18n';

function App() {
    const [showFavTab, setShowFavTab] = React.useState(false);

    const toggleTab = (action) => {
        console.log(`action`, action);
        setShowFavTab(action);
    };

    return (
        <Suspense fallback={null}>
            <Header />
            <CompanyList showFavTab={showFavTab} />
            <MobileNav toggleTab={toggleTab} showFavTab={showFavTab} />
        </Suspense>
    );
}
export default App;
