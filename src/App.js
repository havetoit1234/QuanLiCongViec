import React , {Component} from 'react';
import TaskForm from './Component/TaskForm'
import Control from './Component/Control'
import Result from './Component/Result'
import './App.css';
class App extends Component{

    constructor(props){
        super(props);
        this.state={
            tasks : [] , // id : duy nhat , name ,status
            isDisplayForm : false ,
            taskEditing : null,
            filter : {
                name : '',
                status : -1
            } ,
            filter1 : ''
        }
    }
    
    
    s4(){
        return Math.floor((1+Math.random())* 0x10000).toString(16); // ham random
    }
    onrandomId(){
        return this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4(); // hamramdom
    }
    componentWillMount(){ // ham mac dinh f5 lai la ...... dua du lieu len 
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks')) // chuyen kieeu tring thanh object
            this.setState({
                tasks : tasks
            });
        }
    }
    onToggelForm = () => {
        if(this.state.isDisplayForm === true && this.state.taskEditing !== null){
            this.setState({
                isDisplayForm   : true , 
                taskEditing  : null 
            });   
        }
        
        this.setState({
            isDisplayForm : !this.state.isDisplayForm,
            taskEditing : null
        });
    }
    onCloseForm = () =>{
        this.setState({
            isDisplayForm : false
        })
    }
    onShowForm = () =>{
        this.setState({
            isDisplayForm : true
        })
    }
    onSubmit = (data) =>{
        var {tasks} = this.state;// var tasks = this.state.tasks
        if(data.id ===""){
            data.id = this.onrandomId(); // thêm dữ liệu id vào trong biến data
            tasks.push(data);
        }else{
            // Editing
            var index = this.findIndex(data.id);
            tasks[index] = data; 
        }
        
        this.setState({
            tasks : tasks,
            taskEditing : null
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));

    }
    onUpdateStatus = (id) =>{
        var index = this.findIndex(id);
        var {tasks} = this.state;
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
        }
        this.setState({
            tasks : tasks,
            
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    findIndex = (id)=>{
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task ,index )=>{
            if(task.id === id){
                result = index;
            }
        })
        return result;
    }
    onDelete = (id) =>{
        var index = this.findIndex(id);
        var {tasks} = this.state;
        if(index !== -1){
            tasks.splice(index,1);
        }
        this.setState({
            tasks : tasks
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
        this.onCloseForm();

    }
    onUpdate = (id) =>{
        var index = this.findIndex(id);
        var {tasks} = this.state;
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        }); 
        this.onShowForm();
    }
    onFilter = (filterName , filterStatus) =>{
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }            
        });
      
    }

    onSearch = (key) =>{
        this.setState({
            filter1 : key
        })
    }

    render(){
        var {tasks , isDisplayForm, taskEditing, filter , filter1} = this.state; // var tasks = this.state.tasks
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task) =>{
                    return task.name.toLowerCase().indexOf(filter.name) !== -1 ; // ham indexOf de kiem tra xem chuoi co trong do hay khong
                })
            }
            tasks = tasks.filter((task) => {
                if(filter.status === -1){
                    return task;
                }else{
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
        }
        if(filter1){
            tasks = tasks.filter((task) =>{
                return task.name.toLowerCase().indexOf(filter1) !== -1
            })
        }
        var elmDisplayForm = isDisplayForm === true ? 
            <TaskForm  
            onSubmit ={this.onSubmit}
            onCloseForm={this.onCloseForm}
            task = {taskEditing}
            /> : '';
        return(
            <div className="container">
        <div className="text-center ">
            <h1>Quản Lý Công Việc</h1>
            <br/>
        </div>
        <div className="row"> 
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                {elmDisplayForm}
            </div>
            <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button 
                type="button" 
                className="btn btn-primary "
                onClick={this.onToggelForm}>
                    <span className="fa fa-plus "></span>Thêm Công Việc
                </button>
                <Control 
                    onSearch={this.onSearch}
                    />
                <Result 
                    tasks={tasks}
                    onUpdateStatus={this.onUpdateStatus} 
                    onDelete = {this.onDelete}
                    onUpdate={this.onUpdate}
                    onFilter = {this.onFilter}
                    />
            </div>
        </div>
    </div>
    
);      
    }
}
 
 

export default App;
