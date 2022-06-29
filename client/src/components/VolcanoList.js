import { useMemo } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'; // Optional theme CSS

import { useFetchVolcanoes } from '../hooks/useAPI';

import transition from '../utils/transition';

import Loading from './Loading';
import Error from './Error';

export default function VolcanoList ({country, populatedWithin}) {
    const { darkMode } = useTheme()
    const navigate = useNavigate(0)

    const columnDefs = useMemo(() => [
        { headerName: "name", field: "name", sortable: true, filter: 'agTextColumnFilter'},
        { headerName: "region", field: "region", sortable: true},
        { headerName: "subregion", field: "subregion", sortable: true}
    ], [])
    
    const {loading, data: volcanoData, error} = useFetchVolcanoes(country, populatedWithin)

    return (
        <motion.div
            key="table"
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: transition(.2)}}
            exit={{opacity: 0, transition: transition(0)}}
            className='ag-theme-alpine w-full h-3/4 p-3'>
            { loading && <Loading/>}
            { error && <Error error={error}/> }
            { !loading && !error && (
                <AgGridReact
                    className={darkMode ? "ag-theme-alpine-dark" : "ag-theme-alpine shadow-lg"}
                    onRowClicked={(e) => navigate(`/volcano/${e.data.id}`)}
                    columnDefs={columnDefs}
                    rowData={volcanoData}
                    pagination
                    paginationAutoPageSize={true}
                    gridOptions={{
                        onGridReady: (event) => event.api.sizeColumnsToFit()
                    }}
                />
            )}
        </motion.div>
    )

}