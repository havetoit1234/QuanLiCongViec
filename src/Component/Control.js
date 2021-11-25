import React , {Component} from 'react';
import Search from './Search';

class Control extends Component{
    render(){
        return(
            <div className="row mt-15"> 
                {/*search*/}              
                <Search 
                    onSearch={this.props.onSearch}
                    />
            </div>   
            );      
        }
    }
 
 
export default Control;
