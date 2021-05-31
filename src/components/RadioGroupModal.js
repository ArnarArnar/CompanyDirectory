import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ModalHeadlessButton({ searchOption, changeSearchOption, style }) {
    let [isOpen, setIsOpen] = useState(false);
    const modalRef = React.useRef(null);
    const { t } = useTranslation();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="inline-block group">
            <button
                className={`${style} `}
                onClick={() => {
                    openModal();
                }}>
                <div>{t('change')}</div>
            </button>

            <Transition show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    initialFocus={modalRef}
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <div className="inline-block w-full max-w-md text-left align-top transition-all transform shadow-xl mt-52 rounded-xl">
                                <div className="relative flex flex-col w-full border-0 rounded-lg outline-none bg-blue900 focus:outline-none">
                                    <Dialog.Description>
                                        <button
                                            className="w-full p-3 border-b border-blue600 last:border-b-0"
                                            onClick={() => {
                                                changeSearchOption('BOTH');
                                                setIsOpen(false);
                                            }}>
                                            <input
                                                id="radio1"
                                                type="radio"
                                                name="radio"
                                                className="hidden"
                                                defaultChecked={
                                                    searchOption === 'BOTH' ? true : false
                                                }
                                            />
                                            <label
                                                ref={modalRef}
                                                htmlFor="radio1"
                                                className="flex items-center justify-between text-xl text-gray-300 transition cursor-pointer select-none hover:text-gray-200 ">
                                                {t('searchOptionBoth')}
                                                <span className="inline-block w-8 h-8 border-2 border-gray-400 rounded-full flex-no-shrink"></span>
                                            </label>
                                        </button>
                                        <button
                                            className="w-full p-3 border-b border-blue600 last:border-b-0 "
                                            onChange={() => {
                                                changeSearchOption('REGISTERED');
                                                setIsOpen(false);
                                            }}>
                                            <input
                                                id="radio2"
                                                type="radio"
                                                name="radio"
                                                className="hidden"
                                                defaultChecked={
                                                    searchOption == 'REGISTERED' ? true : false
                                                }
                                            />
                                            <label
                                                htmlFor="radio2"
                                                className="flex items-center justify-between text-xl text-gray-300 transition cursor-pointer select-none hover:text-gray-200">
                                                {t('searchOptionRegistered')}
                                                <span className="inline-block w-8 h-8 border-2 rounded-full shadow-inner border-blue500 flex-no-shrink"></span>
                                            </label>
                                        </button>
                                        <button
                                            className="w-full p-3 border-b border-blue600 last:border-b-0"
                                            onChange={() => {
                                                changeSearchOption('DEREGISTERED');
                                                setIsOpen(false);
                                            }}>
                                            <input
                                                id="radio3"
                                                type="radio"
                                                name="radio"
                                                className="hidden"
                                                defaultChecked={
                                                    searchOption == 'DEREGISTERED' ? true : false
                                                }
                                            />
                                            <label
                                                htmlFor="radio3"
                                                className="flex items-center justify-between text-xl text-gray-300 transition cursor-pointer select-none hover:text-gray-200">
                                                {t('searchOptionDeregistered')}
                                                <span className="inline-block w-8 h-8 border-2 border-gray-400 rounded-full flex-no-shrink"></span>
                                            </label>
                                        </button>
                                    </Dialog.Description>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
