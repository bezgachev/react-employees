import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Alexey', salary: 600, increase: false, rise: false, id: 1},
                {name: 'Irina', salary: 2500, increase: false, rise: false, id: 2},
                {name: 'Marina', salary: 3000, increase: true, rise: true, id: 3},
                {name: 'Ivan', salary: 5000, increase: true, rise: true, id: 4}
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const newArr = data.filter(item => item.id !== id)
            return {
                data: newArr
            }
        })
    }

    addItem = (name, salary, id) => {
        const newItem = {
            name,
            salary,
            id,
            increase: false,
            rise: false
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onUpdateSalary = (id, value) => {
        if (value <= 0) {
            return;
        }
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: value.replace(/\D/g, '')}
                }
                return item;
            })
        }))
    }

    render() {
        const {data, term, filter}= this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={id => this.deleteItem(id)}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onUpdateSalary}
                />

                <EmployeesAddForm onAdd={this.addItem} employees={employees}/>
    
            </div>
        );
    }
}

export default App;