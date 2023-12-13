import React, { useState } from 'react';
function Welcome() {
    const [step, setStep] = useState(1);
    const [birthdate, setBirthdate] = useState('');

    const handleDateChange = (event) => {
        setBirthdate(event.target.value);
    };

    const handleNextClick = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            if (!birthdate) {
                alert('Please enter your birthdate');
            } else {
                setStep(3);
            }
        }
    };

    const resetForm = () => {
        setStep(1);
        setBirthdate('');
    };

    function calculateAgeInWeeks(birthdate) {
        if (!birthdate) return null;
        const birthDate = new Date(birthdate);
        const currentDate = new Date();
        const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
        const ageInMilliseconds = currentDate - birthDate;
        return Math.floor(ageInMilliseconds / millisecondsPerWeek);
    }

    const renderFormStep = () => {
        if (step === 1) {
            return (
                <div className="slider-form slider-one">
                    <h2>Do you want to know how many weeks left do you have if you were to live until 80?</h2>
                    <button className="first next" onClick={handleNextClick}>of course!</button>
                </div>
            );
        } else if (step === 2) {
            return (
                <div className="slider-form slider-two">
                    <h2>Enter your birthdate</h2>
                    <label className="input">
                        <input type="date" className="name" placeholder="birthdate" value={birthdate} onChange={handleDateChange} />
                    </label>
                    <button className="second next" onClick={handleNextClick}>Result</button>
                </div>
            );
        } else {
            const ageInWeeks = calculateAgeInWeeks(birthdate);
            const weeksToLive = 80 * 52 - ageInWeeks;
            return (
                <div className="slider-form slider-three">
                    <h3>Thank you for your input!</h3>
                    <h3>You are approximately {ageInWeeks} weeks old.</h3>
                    <h3>You have about {weeksToLive} weeks to live until 80 years old.</h3>
                    <a className="reset" href="/" target="_blank" onClick={resetForm}>Reset</a>
                </div>
            );
        }
    };

    return (

        <div style={{ background: 'linear-gradient(90deg, #485563 10%, #274c77 90%)' }}>
            <div>
                <a href="/login" className="getStarted">Get Started!</a>
            </div>
            <div>

                <section className='welcome' style={{ height: '285px' }}>

                    <div className="wrapper">
                        <h1 className="giga bree-serif regular double-header-line">Time is what we want most <br></br>and what we use worst</h1>
                        <p className="delta oswald regular uppercase ls-large">William Penn</p>
                    </div>
                </section>
            </div>
            <div className="blockquote-wrapper">
                <div className="blockquote">
                    <h1 style={{ color: '#ffffff' }}>
                        “The core challenge of managing our limited time isn't
                        <span style={{ color: '#ffffff' }}> about how to get everything done—that's never going to happen </span> —but how to decide most wisely what not to do,
                        <span style={{ color: '#ffffff' }}> and how to feel at peace about not doing it.”</span>
                    </h1>
                    <h4>&mdash; Oliver Burkeman,<br /><em>Four Thousand Weeks: Time Management for Mortals</em></h4>
                </div>
            </div>
            <div className="container slider-one-active">
                <div className="steps">
                    <div className="step step-one">
                        <div className="liner"></div>
                        <span>Hello!</span>
                    </div>
                    <div className="step step-two">
                        <div className="liner"></div>
                        <span>Birthdate</span>
                    </div>
                    <div className="step step-three">
                        <div className="liner"></div>
                        <span>Weeks left!</span>
                    </div>
                </div>
                <div className="line">
                    <div className="dot-move"></div>
                    <div className="dot zero"></div>
                    <div className="dot center"></div>
                    <div className="dot full"></div>
                </div>
                <div className="slider-ctr">
                    <div className="slider">
                        {renderFormStep()}
                    </div>
                </div>
            </div>
            {/* <div style={{ textAlign: 'center', marginBottom: '20px' }}><a className="start" href="/signup">Let's write your goals</a></div> */}
        </div>
    );

}

export default Welcome;
