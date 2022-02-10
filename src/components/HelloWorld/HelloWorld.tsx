import * as React from 'react';
import { Component } from 'react';

import HelloWorldService from './HelloWorldService';

interface IProps {
    applicationName: string;
}

interface IState {
    greetings: string;
}

class HelloWorld extends Component<IProps, IState> {

    private helloWorldService = new HelloWorldService();

    constructor(props: IProps) {
        super(props);

    }

    sayHello(): void {
        let result: string = this.helloWorldService.getHelloMessage(this.props.applicationName);
        this.setState({
            greetings: result
        });
        console.log(this.state.greetings);
    }

    render() {
        return (
            <div>{this.state.greetings}</div>
        );
    }

}

export default HelloWorld;



