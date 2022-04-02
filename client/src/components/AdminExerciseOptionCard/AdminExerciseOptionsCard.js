import React, { useState } from 'react';

const AdminExerciseOptionsCard = ({ adminOptionsOnClick }) => {
    
    const handleOnClick = (e, isNewExericse) => {
        adminOptionsOnClick(isNewExericse);
    }

    return (
        <div className="rating-container">
            <h4>Inställningar</h4> 
            <div className="rating-btn-container" style={{flexDirection: 'column'}}>
                <button className="btn-secondary" onClick={(e) => handleOnClick(e, true)}>Skapa uppgift</button>
                <button className="btn-secondary" onClick={(e) => handleOnClick(e, false)}>Redigera uppgift</button>
            </div>
        </div>
    )
}

export default AdminExerciseOptionsCard;