import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from '../src/components'
class Demo extends React.Component{
    render(){
        return(
            <div>
                <Button type="primary">呵呵</Button>
            </div>
        )
    }
}
ReactDOM.render(<Demo></Demo>,document.getElementById('root'));