import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ showSearchTab }) => {
    const { t, i18n } = useTranslation();
    const [lang, setLang] = React.useState('en');

    const changeLanguage = () => {
        setLang(lang == 'en' ? 'is' : 'en');
        i18n.changeLanguage(lang);
    };

    return (
        <nav className="w-full py-2 font-sans text-center bg-white bg-blue700">
            <div className="container flex justify-between max-w-5xl px-5 mx-auto md:px-8">
                <div className="w-6"></div>
                <div
                    onClick={() => showSearchTab()}
                    className="ml-2 overflow-hidden text-3xl font-semibold leading-normal text-grayLight ">
                    {t('header.label')}
                </div>
                <button
                    className="self-center w-6 h-6 font-black leading-relaxed rounded bg-grayLight text-blue800"
                    onClick={() => changeLanguage()}>
                    {lang == 'is' ? 'IS' : 'EN'}
                </button>
            </div>
        </nav>
    );
};

export default Header;
