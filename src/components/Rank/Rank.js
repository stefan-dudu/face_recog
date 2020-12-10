import React from 'react';


const Rank = ({name, entries}) => {
    return(
        <div>
            <div className= 'white f3'>
                {`Congratulations ${name}, you have identified so far `}
            </div>

            <div className= 'white f1'>
                {entries}
            </div>

            <div className= 'white f3'>
                {`faces using our website`}
            </div>

        </div>
    )
};

export default Rank;