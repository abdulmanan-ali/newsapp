const ServerError = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 bg-red-500 rounded-lg shadow-lg text-white">
                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                    <p className="text-lg font-semibold">Server Not Responding</p>
                    <p className="text-sm">We are experiencing technical difficulties. Please try again later.</p>
                </div>
            </div>
        </div>
    );
};

export default ServerError;
