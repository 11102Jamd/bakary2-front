const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#343a40', 
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center'
            },
        },
        cells:{
            style: {
                fontSize: '18px',  // Tamaño de fuente aumentado para el contenido
                padding: '12px 10px',  // Más espacio en celdas
                textAlign: 'center'
            },
        },
        rows: {
            style: {
                minHeight: '60px',
                '&:nth-child(even)': {
                    backgroundColor: '#f8f9fa', // Color claro alterno
                },
                '&:hover': {
                    backgroundColor: '#e9ecef !important', // Color hover
                },
                textAlign: 'center',
            },
        },
        pagination: {
            style: {
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #dee2e6',
            },
        },
    };

export default customStyles;