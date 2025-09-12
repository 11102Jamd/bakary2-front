import React from 'react';

function NumberFormatter({ value, decimals = 0, prefix = '', suffix = '' }) {
    const formattedValue = parseFloat(value || 0).toLocaleString('es-CO', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

    return (
        <span>
            {prefix}{formattedValue} {suffix}
        </span>
    );
}

export default NumberFormatter;