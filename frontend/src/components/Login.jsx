import React, {Component} from "react";
import {connect} from "react-redux";
import { Grid, Form, Button, Image, Message } from 'semantic-ui-react';
import playerimg from '../images/playerimg.jpg';
import background from '../images/background.jpeg';
import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

const styles = {
root: {
 marginTop: '5%'
}
}

const styles1 = {
root: {
//background: `url(${background}) no-repeat fixed`,
backgroundOrigin: 'content-box',
//backgroundSize:'auto',
backgroundColor:'#987654',
height: '100%'
}
}
class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <div style={styles1.root} >
            <Grid centered style={styles.root} textAlign='center'>
            <Grid.Column width={6}>
            <form onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>Login</legend>
                   <Image src={playerimg} size='medium' centered />
                    {this.props.errors.length > 0 && (
                        <ul>
                            {this.props.errors.map(error => (
                                <li key={error.field}>{error.message}</li>
                            ))}
                        </ul>
                    )}
                    <Form>
                      <Form.Field>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text" id="username"
                            onChange={e => this.setState({username: e.target.value})} />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" id="password"
                            onChange={e => this.setState({password: e.target.value})} />
                      </Form.Field>
                      
                        <Button type="submit" fluid size='large'>Login</Button>
                      
                     </Form>
                    <Message>
                        Don't have an account? <Link to="/register">Register</Link>
                    </Message>
                </fieldset>
            </form>
           </Grid.Column>
          </Grid>
     </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
