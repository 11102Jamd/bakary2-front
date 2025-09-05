import React, { useState } from 'react';

const DateFilter = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState(getFormattedDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)));
    const [endDate, setEndDate] = useState(getFormattedDate(new Date()));

    function getFormattedDate(date) {
        return date.toISOString().split('T')[0];
    }

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        onDateChange(new Date(newStartDate), new Date(endDate));
    };

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
        onDateChange(new Date(startDate), new Date(newEndDate));
    };

    const setDateRange = (days) => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        
        const formattedStart = getFormattedDate(start);
        const formattedEnd = getFormattedDate(end);
        
        setStartDate(formattedStart);
        setEndDate(formattedEnd);
        onDateChange(start, end);
    };

    return (
        <div className="card mb-2 small">
            <div className="card-body p-2">
                <div className="row align-items-center g-2">
                <div className="col-md-2">
                    <h6 className="mb-0">Filtrar por fecha:</h6>
                </div>
                <div className="col-md-3">
                    <label className="form-label form-label-sm mb-1">Desde:</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label form-label-sm mb-1">Hasta:</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <button 
                            type="button" 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setDateRange(7)}
                        >
                            7 días
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setDateRange(30)}
                        >
                            30 días
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default DateFilter;