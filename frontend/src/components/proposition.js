import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import lodash from 'lodash';
import axios from 'axios';
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex'

class proposition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: [],
            value: '',


            statement: '',
            proof: '',
            topic: '',
        }
    }

    componentDidMount() {
        axios.get(`https://mathdb-backend.herokuapp.com/proposition`).then((res) => {
            const Array = res.data;
            this.setState({ Array });
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })

    }
    handleValidation = () => {
        let formIsValid = true;
        if (!this.state.statement || !this.state.proof || !this.state.topic) {
            formIsValid = false
        }

        return formIsValid

    }

    handleSubmit = (e) => {

        if (this.handleValidation()) {
            e.preventDefault();
            axios.post(`http://localhost:8080/proposition`, {
                statement: this.state.statement,
                proof: this.state.proof,
                topic: this.state.topic
            }).then((res) => {
                console.log(res);
            })
            window.location.reload();

        } else {
            alert('Form cannot be empty')

        }


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
                return this.setState({ isLoading: false, results: [], value: '', })

            const re = new RegExp(lodash.escapeRegExp(this.state.value), 'i')
            //Change your search perference here
            const isMatch = (result) => re.test(result.topic)

            this.setState({
                isLoading: false,
                results: lodash.filter(this.state.Array, isMatch),
            })
        }, 300)


    }

    render() {
        const mapping = this.state.results.map((math) => {
            return (
                <div>
                <Card>
                    <Card.Header><Latex>{math.statement}</Latex></Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>
                                {' '}
                                <Latex>{math.proof}</Latex>
                                {' '}
                            </p>
                            <footer className="blockquote-footer">
                                {math.topic}
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
                <br />
                </div>
                
            )
        })
        return (
            <Row>
                <Col>
                    <h1>Proposition</h1>
                    <h3>Search</h3>
                    <Search
                        loading={this.state.isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={lodash.debounce(this.handleSearchChange, 500, {
                            leading: true,
                        })}
                        results={this.state.results}
                        value={this.state.value}
                        {...this.props}
                    /><br />
                    <h3>Add new Proposition</h3>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Statement</Form.Label>
                            <Form.Control as="textarea" rows="3" name="statement" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Proof</Form.Label>
                            <Form.Control as="textarea" rows="3" name="proof" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Related Topic</Form.Label>
                            <Form.Control type="text" name="topic" onChange={this.handleChange} />
                        </Form.Group>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </Form>

                </Col>
                <Col width={10}>
                    {mapping}
                    
                </Col>
            </Row>
        )
    }
}

export default proposition;