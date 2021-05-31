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
                            <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
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
