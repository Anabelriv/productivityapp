function Result() {
    return (
        <div className="result">
            <div className="result-inner">
                <h1>The goal you should work on right now is:</h1>
                <p>Goal Name</p>
                <svg className="resultname" width="70%" height="150" aria-hidden="true">
                    <path
                        style={{ transform: 'translateY(1em) scale(2)' }}
                        fill="none"
                        stroke="#EE6C4D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        d="M16.7 20.2c76.5 4.4 153.6-9.7 229.8-4.1 5.4.4 12.4 2.1 11.7 5.6-67.3 1.7-134.5 5.5-201.2 11.5l87.7-.9c35.2-.4 70.8-.7 104.9 4.6"
                    />
                </svg>
            </div>
        </div>

    )
}

export default Result;