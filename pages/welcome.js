import React from 'react'

function Welcome({ setWelcomeModal, setPuzzleSize }) {
    return (
        <div
            className="relative z-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-zinc-500 bg-opacity-70 transition-opacity"></div>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center  ">
                    <div className="w-full max-w-[290px] transform overflow-hidden rounded-lg bg-white shadow-xl transition-all ">
                        <div className="relative px-[32px] py-[24px]">
                            <div className="flex flex-col max-w-[290px] items-center justify-center w-full">
                                <h1 className="pt-4 text-[#262626] text-[18px] font-semibold font-Manrope leading-[100%]">
                                    Welcome to team
                                </h1>
                            </div>
                            <div
                                onClick={() => { setWelcomeModal(false), setPuzzleSize && setPuzzleSize("")  }}
                                className="absolute top-[16px] cursor-pointer right-[16px]"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.3259 9.99967L15.0369 6.28874C15.213 6.11293 15.3121 5.87435 15.3123 5.6255C15.3125 5.37665 15.2139 5.1379 15.0381 4.96178C14.8622 4.78566 14.6237 4.6866 14.3748 4.68638C14.126 4.68616 13.8872 4.7848 13.7111 4.96061L10.0002 8.67155L6.28922 4.96061C6.1131 4.78449 5.87423 4.68555 5.62516 4.68555C5.37609 4.68555 5.13722 4.78449 4.9611 4.96061C4.78498 5.13673 4.68604 5.3756 4.68604 5.62467C4.68604 5.87374 4.78498 6.11262 4.9611 6.28874L8.67204 9.99967L4.9611 13.7106C4.78498 13.8867 4.68604 14.1256 4.68604 14.3747C4.68604 14.6237 4.78498 14.8626 4.9611 15.0387C5.13722 15.2149 5.37609 15.3138 5.62516 15.3138C5.87423 15.3138 6.1131 15.2149 6.28922 15.0387L10.0002 11.3278L13.7111 15.0387C13.8872 15.2149 14.1261 15.3138 14.3752 15.3138C14.6242 15.3138 14.8631 15.2149 15.0392 15.0387C15.2153 14.8626 15.3143 14.6237 15.3143 14.3747C15.3143 14.1256 15.2153 13.8867 15.0392 13.7106L11.3259 9.99967Z"
                                        fill="#18181B"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome