import InsertField from '../components/DoctorComponent/InsertField';


//Initial Data
const  initialState = {
    dashBoardTable: {
        columns: [
            { accessor: 'firstName',   label: 'Patient Name', priorityLevel: 1, position: 1, minWidth: 150, CustomComponent: InsertField },
            { accessor: 'email',  label: 'Email', priorityLevel: 2, position: 2, minWidth: 150 ,CustomComponent: InsertField },
            { accessor: 'phone',  label: 'Phone', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField},
            { accessor: 'date',   label: 'Date', priorityLevel: 4, position: 4, minWidth: 150, sortType: 'date', sortable: false },
            { accessor: 'time',   label: 'Time', priorityLevel: 5, position: 5, minWidth: 150, sortable: false },
            { accessor: 'image',  label: 'Photo', priorityLevel: 6, position: 6, minWidth: 200, CustomComponent: InsertField, sortable: false },
            { accessor: 'action', label: 'Action', priorityLevel: 7, position: 7, minWidth: 200, CustomComponent: InsertField, sortable: false }

        ],
        rows: [],
        defaultSortColumn: 'date',
    } ,

    appointmentsTable: {
        columns: [
            { accessor: 'firstName',   label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, CustomComponent: InsertField },
            { accessor: 'time',   label: 'Time', priorityLevel: 2, position:2, minWidth: 150, sortable: false },
            { accessor: 'join',  label: '', priorityLevel: 3, position: 3, minWidth: 200, CustomComponent: InsertField, sortable: false }
        ],
        rows: [],
        defaultSortColumn: 'date',
    },

    
    appointmentsHistoryTable: {
        columns: [
            { accessor: 'firstName',   label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, CustomComponent: InsertField },
            { accessor: 'time',   label: 'Time', priorityLevel: 2, position: 2, minWidth: 150, sortable: false },
            { accessor: 'date',   label: 'Date', priorityLevel: 3, position: 3, minWidth: 150, sortType: 'date', sortable: false },
            { accessor: 'report',  label: '', priorityLevel: 4, position: 4, minWidth: 200, CustomComponent: InsertField, sortable: false }       
        ],
        rows: [],
        defaultSortColumn: 'date',
    },
    reportsTable: {
        columns: [
            { accessor: 'time',   label: 'Time', priorityLevel: 1, position: 1, minWidth: 150, sortable: false },
            { accessor: 'date',   label: 'Date', priorityLevel: 2, position: 2, minWidth: 150, sortType: 'date', sortable: false },
            { accessor: 'report',   label: 'View Report', priorityLevel: 3, position: 3, minWidth: 150, CustomComponent: InsertField },
        ],
        rows: [],
        defaultSortColumn: 'date',
    },
    patientsTable: {
        columns: [
            { accessor: 'firstName',   label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, CustomComponent: InsertField },
            { accessor: 'email',  label: 'Email', priorityLevel: 2, position: 2, minWidth: 150 ,CustomComponent: InsertField },
            { accessor: 'phone',   label: 'Phone', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField},
            { accessor: 'viewProfile',  label: '', priorityLevel: 7, position: 7, minWidth: 200, CustomComponent: InsertField, sortable: false }  
         ],
        rows: [],
        defaultSortColumn: 'date',
    } 
}

const TableReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default TableReducer;
