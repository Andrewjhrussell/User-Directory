import React, { Component } from "react";
import list from '../utils/users.json'
import Tbody from './tbody'
import './main.css'
export default class Main extends Component {
    state = {
        mainList: [],
        workingList: [],
        sortDir: ''
    }
    componentDidMount() {
        this.setState({
            mainList: list,
            workingList: list,

        })
    }
    sortIT = () => {

        const sortedList = this.state.workingList.sort((a, b) => {
            const x = a.name.first;
            const z = b.name.first;
            if (this.state.sortDir !== "asc"|| this.state.sortDir ==="") {
                if (x > z) {
                    return 1;
                }
                if (x < z) {
                    return -1;
                }
                return 0;
            } else {
                if (x < z) {
                    return 1;
                }
                if (x > z) {
                    return -1;
                }
                return 0;
            }
        });
        let dir = ""
        if(this.state.sortDir !== "asc"){
            dir = "asc"
        }else dir = "des"
        this.setState({
            workingList:sortedList,
            sortDir:dir
        })

    }
    handleChange=(e)=>{
        const searchTerm = e.target.value.toLowerCase()
        const searchList = this.state.mainList.filter(user=>{

            const first = user.name.first.toLowerCase()
            const last = user.name.last.toLowerCase()
            //console.log(first, last, searchTerm)
            if(first.includes(searchTerm) || last.includes(searchTerm)) return true
            else return false
        })
        this.setState({
            workingList: searchList
        })
    }
    render() {

        return (
            <>
            <div>
                Name Search 
                <input type="text" onChange={(e)=>this.handleChange(e)}/>
            </div>
                <table className="table">
                    <thead>
                        <tr>
                        
                            <th scope="col">#</th>
                            <th scope="col" onClick={this.sortIT} className="name">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">City</th>
                        </tr>
                    </thead>
                    <Tbody users={this.state.workingList} />
                </table>
            </>
        )
    }
}
