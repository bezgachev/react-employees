import { Component } from 'react';

import "./search-panel.css";

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearchLocal = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <input 
            type="text"
            onChange={this.onUpdateSearchLocal}
            value={this.state.term}
            className="form-control search-input"
            placeholder="Найти сотрудника"/>
        )
    }
}

export default SearchPanel;
