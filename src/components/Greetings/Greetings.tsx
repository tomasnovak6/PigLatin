import * as React from 'react';
import { Component } from 'react';

import HelloWorld from './../HelloWorld/HelloWorld';

class Greetings extends Component {

    render() {
        return (
            <div>
                <HelloWorld applicationName={'HealthCare-App'} />
            </div>
        );
    }

}

export default Greetings;




