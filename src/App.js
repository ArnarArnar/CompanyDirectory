import React from 'react';
import Header from './components/Header';
import CompanyList from './components/CompanyList';
import MobileNav from './components/MobileNav';

function App() {
    const [showFavoritesTab, setShowFavoritesTab] = React.useState(false);
    return (
        <>
            <Header />
            <CompanyList />
            <MobileNav />
        </>
    );
}
export default App;
