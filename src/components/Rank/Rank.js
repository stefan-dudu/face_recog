import React from 'react';


const Rank = ({name, entriess}) => {
    return(
        <div>
            <div className= 'white f3'>
                {`${name}, your current rank is ...`}
            </div>

            <div className= 'white f1'>
                {entriess}
            </div>
        </div>
    )
};

export default Rank;