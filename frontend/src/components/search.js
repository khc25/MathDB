import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import lodash from 'lodash';
import axios from 'axios';
import { Card } from 'react-bootstrap'

class SearchFuntion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: [],
            value:'',
        }
    }

    componentDidMount() {
        axios.get(`http://my-json-server.typicode.com/khc25/fakejsonserver/posts`).then((res) => {
            const Array = res.data;
            this.setState({ Array });
        })
    }

    handleResultSelect = (e, { result }) => {
        this.setState({
            value: result.name
        })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({
            isLoading: true, value
        })

        setTimeout(() => {
            if (this.state.value.length < 1) 
                return this.setState({  isLoading: false,results: [], value:'',})

            const re = new RegExp(lodash.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.name)

            this.setState({
                isLoading: false,
                results: lodash.filter(this.state.Array, isMatch),
            })
        }, 300)


    }

    render() {
        return (
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={this.state.isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={lodash.debounce(this.handleSearchChange, 500, {
                            leading: true,
                        })}
                        results={this.state.results}
                        value={this.state.value}
                        {...this.props}
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Segment>
                        <Header>State</Header>
                        <pre style={{ overflowX: 'auto' }}>
                            {JSON.stringify(this.state, null, 2)}
                        </pre>
                        <Header>Options</Header>
                        <pre style={{ overflowX: 'auto' }}>
                            {JSON.stringify(this.state.Array, null, 2)}
                        </pre>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default SearchFuntion