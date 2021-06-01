import React, { Suspense } from 'react';
import Header from './components/Header';
import CompanyList from './components/CompanyList';
import MobileNav from './components/MobileNav';
import './i18n';

function App() {
    const [showFavTab, setShowFavTab] = React.useState(false);

    const toggleTab = (action) => setShowFavTab(action);
    const showSearchTab = () => setShowFavTab(false);

    return (
        <Suspense fallback={null}>
            <Header showSearchTab={showSearchTab} />
            <CompanyList showFavTab={showFavTab} />
            <MobileNav toggleTab={toggleTab} showFavTab={showFavTab} />
        </Suspense>
    );
}
export default App;
