import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {
    const data = [
        {name: 'Alexey', salary: 600, increase: false, id: 1},
        {name: 'Irina', salary: 2500, increase: false, id: 2},
        {name: 'Marina', salary: 3000, increase: true, id: 3},
        {name: 'Ivan', salary: 5000, increase: true, id: 4}
    ];

    return (
        <div className="app">
            <AppInfo />

            <div className="search-panel">
                <SearchPanel />
                <AppFilter />
            </div>

            <EmployeesList data={data} />
            <EmployeesAddForm />

        </div>
    );
}

export default App;