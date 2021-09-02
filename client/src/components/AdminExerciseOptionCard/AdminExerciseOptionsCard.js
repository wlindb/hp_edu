import React, { useState } from 'react';

const AdminExerciseOptionsCard = ({ adminOptionsOnClick }) => {
    
    const handleOnClick = (e, index) => {
        adminOptionsOnClick(index);
    }

    return (
        <div className="rating-container">
            <h4>Inställningar</h4> 
            <div className="rating-btn-container" style={{flexDirection: 'column'}}>
                <button className="btn-secondary" onClick={(e) => handleOnClick(e, 0)}>Skapa uppgift</button>
                <button className="btn-secondary" onClick={(e) => handleOnClick(e, 1)}>Redigera uppgift</button>
            </div>
        </div>
    )
}

export default AdminExerciseOptionsCard;