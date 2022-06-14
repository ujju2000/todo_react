import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';



class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state = { taskDesc : ''}
    }
    handleTaskTextChange(e){
        this.setState({
            taskDesc: e.target.value
        })
    }
    handleAddTaskClick(){
        this.props.handlerToCollectInfo(this.state.taskDesc);
        this.setState({
            taskDesc : ''
        })
    }
    render(){
        
        return (
                <form>
                    <input type="text" name="" id="" value = {this.state.taskDesc} onChange = {(e) => this.handleTaskTextChange(e)} />

                    <input type="button" value="Add Task" onClick={() => this.handleAddTaskClick()}/>
                </form>
        );
    }
}
class TaskList extends React.Component{
    

    handleTaskClick(taskDesc){
        this.props.handleNewTask(taskDesc);
    }
    render(){
        let list = [];
        for(let i =0;i< this.props.tasks.length;i++){
            let task = this.props.tasks[i];
            let spanAction;

            if(task.isFinished){
                spanAction = (<span class = "material-icons" onClick = {() => this.handleTaskClick(task.desc)}>close</span>);
            }else {
                spanAction = (<span class = "material-icons" onClick = {() => this.handleTaskClick(task.desc)}>done</span>);
            }
            
            let listitem = (
                <li key = {i}>
                    <span>{task.desc}</span>
                    {spanAction}
                </li>
            );
            list.push(listitem);
        }
        return (
                <div className = 
                {this.props.purpose == "Todo" ? "todo" : "finished"}>
                <div className="list-container">
                    <div className="title">
                        {this.props.purpose}
                    </div>
                <div className="content">
                    {list}
                </div>
                </div>
                </div>
        );
    }
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks : [{
                desc : 'Switch off light',
                isFinished : false
            },{
                desc : 'Turn on Fan',
                isFinished : true
            },{
                desc : 'Make Tea',
                isFinished : false
            },{
                desc : 'Make dinner',
                isFinished : true
            }]
        }
    }
    handleNewTask(taskDesc){
        let oldTasks = this.state.tasks.slice(); // copying the old task 

        oldTasks.push({
            desc: taskDesc,
            isFinished : false
        });
        
        this.setState({
            tasks:oldTasks
        })
    }
    handleTaskStatusUpdate(taskDesc,newStatus){
        let oldTask = this.state.tasks.slice();
        let taskItem = oldTask.find(ot => ot.desc == taskDesc);
        taskItem.isFinished = newStatus;
        this.setState({
            task : oldTask
        })
    }
    render(){
       let tasks = this.state.tasks;
       let todoTasks = tasks.filter(t => t.isFinished == false);
       let doneTasks = tasks.filter(t => t.isFinished == true);
        return (
            <>
            <div className='add-task'>
                <AddTask handlerToCollectInfo= {(taskDesc) => this.handleNewTask(taskDesc)}/>
            </div>
            <div className='task-lists'>
                <TaskList  handleNewTask={(taskDesc) => this.handleTaskStatusUpdate(taskDesc,true)} tasks={todoTasks} purpose= "Todo"  forStyling = 'todo'/>
                <TaskList handleNewTask={(taskDesc) => this.handleTaskStatusUpdate(taskDesc,false)} tasks = {doneTasks} purpose = "finished"  forStyling= 'finished'/>
            </div>
            </>
        );
    }
}

ReactDOM.render(<App />,document.getElementById("root"));
