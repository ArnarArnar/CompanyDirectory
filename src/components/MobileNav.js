import React from 'react';

export default function MobileNav({ toggleTab, showFavTab }) {
    console.log(`showFavTab`, showFavTab);
    return (
        //    if shown only tablet/mobile
        <section
            id="bottom-navigation"
            className="fixed inset-x-0 bottom-0 z-10 block border-t-4 shadow bg-blue700 border-blue700 md:hidden">
            <div id="tabs" className="flex justify-between">
                <button
                    onClick={() => {
                        toggleTab(false);
                    }}
                    className={`justify-center inline-block w-full pt-2 pb-1 text-center  focus:text-teal-500 hover:text-teal-500 ${
                        showFavTab ? 'bg-blue700' : 'bg-blue500'
                    } `}>
                    <svg width="50" height="50" viewBox="0 0 25 25" className="inline-block mb-1">
                        <g stroke="none" strokeWidth="1" fill="white" fillRule="evenodd">
                            <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => {
                        toggleTab(true);
                    }}
                    className={`justify-center inline-block w-full pt-2 pb-1 text-center focus:text-teal-500 hover:text-teal-500 ${
                        showFavTab ? 'bg-blue500' : 'bg-blue700'
                    } `}>
                    <svg width="50" height="50" viewBox="0 0 25 25" className="inline-block mb-1">
                        <g stroke="none" strokeWidth="1" fill="white" fillRule="evenodd">
                            <path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" />
                        </g>
                    </svg>
                </button>
            </div>
        </section>
    );
}
