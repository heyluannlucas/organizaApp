import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Modal({ show, onClose, children }) {
    return (
        <div
            style={{
                transform: show ? "translateX(0%)" : "translateX(-200%)"
            }}
            className='absolute top-0 left-0 w-full h-full z-10 transition-all'
        >
            <div className='container mx-auto max-w-2xl wxl h-[80vh] rounded-3xl bg-[rgba(31,41,55,0.8)] overflow-auto backdrop-filter backdrop-blur-lg'>
                <button
                    onClick={() => {
                        onClose();
                    }}
                    className='w-10 h-10 ml-5 mt-5 mb-2 font-bold rounded-full'>
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
