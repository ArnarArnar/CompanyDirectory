import React, { Suspense } from 'react';
import Header from './components/Header';
import CompanyList from './components/CompanyList';
import MobileNav from './components/MobileNav';
import './i18n';

function App() {
    const [showFavTab, setShowFavTab] = React.useState(false);

    const toggleTab = (action) => setShowFavTab(action);
    // If header text is clicked and in mobile mode, switch to default tab
    const setShowSearchTab = () => setShowFavTab(false);

    return (
        <Suspense fallback={null}>
            <Header showSearchTab={setShowSearchTab} />
            <CompanyList showFavTab={showFavTab} setShowSearchTab={setShowSearchTab} />
            <MobileNav toggleTab={toggleTab} showFavTab={showFavTab} />
        </Suspense>
    );
}
export default App;
