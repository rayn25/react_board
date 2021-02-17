import React, { Component } from "react";
//import { Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

  state = {
      maxNo: 3,
      boards:  [
          {
              brdno: 1,
              brdwriter: 'Lee SunSin',
              brdtitle: 'If you intend to live then you die',
              brddate: new Date()
          },
          {
              brdno: 2,
              brdwriter: 'So SiNo',
              brdtitle: 'Founder for two countries',
              brddate: new Date()
          }
      ],
      selectedBoard: {}
  }

  handleSaveData = (data) => {
      let boards = this.state.boards;
      if(data.brdno === null || data.brdno === '' || data.brdno === undefined) // new : insert
          this.setState({
             maxNo: this.state.maxNo+1,
             boards: boards.concat({ brdno: this.state.maxNo, brddate: new Date(), ...data})
          });
      else {
          this.setState({
              boards: boards.map(row => data.brdno === row.brdno ? {...data}: row)
          })
      }
  }

  handleRemove = (brdno) => {
      this.setState({
          boards: this.state.boards.filter(row => row.brdno !== brdno)
      })
  }

  handleSelectRow = (row) => {
    this.setState({selectedBoard:row})
    //this.child.current.handleSelectRow(row);
  }

  render() {
      const { boards, selectedBoard } = this.state;
      //const boards = this.state.boards;
      // const list = boards.map(function(row){
      //     return row.brdno + row.brdwriter;
      // });

      return (
          <div>
              <BoardForm selectedBoard={selectedBoard} onSaveData={this.handleSaveData}/>
              <table border="1">
                  <tbody>
                  <tr align="center">
                      <td width="50">No.</td>
                      <td width="300">Title</td>
                      <td width="100">Name</td>
                      <td width="100">Date</td>
                  </tr>
                  {
                      boards.map(row =>
                          (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow}/>)
                      )
                  }
                  </tbody>
              </table>
          </div>
      )
  }
}

class BoardItem extends React.Component {
    handleRemove = () => {
        const { row, onRemove } = this.props;
        onRemove(row.brdno);
    }

    handleSelectRow = () => {
        const { row, onSelectRow } = this.props;
        onSelectRow(row);
    }

    render() {
        return (
            <tr>
                <td>{this.props.row.brdno}</td>
                <td><a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a></td>
                <td>{this.props.row.brdwriter}</td>
                <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
                <td><button onClick={this.handleRemove}>X</button></td>
            </tr>
        )
    }
}

class BoardForm extends Component {
    // state = {
    //     brdwriter:'',
    //     brdtitle:''
    // }

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps);
        let selectedBoard = nextProps.selectedBoard;
        if (!selectedBoard.brdno) {
            this.brdtitle.value = "";
            this.brdwriter.value = "";
            return true;
        }
        this.brdtitle.value = selectedBoard.brdtitle;
        this.brdwriter.value = selectedBoard.brdwriter;
        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let selectedBoard = this.props.selectedBoard;
        let data = {
            brdwriter: this.brdwriter.value,
            brdtitle: this.brdtitle.value
        }
        if(selectedBoard.brdno) {
            data.brdno = selectedBoard.brdno;
            data.brddate = selectedBoard.brddate;
        }

        this.props.onSaveData(data);

        //this.props.onSaveData(this.state);
        // this.setState({
        //     brdno:'',
        //     brdwriter:'',
        //     brdtitle:''
        // });
    }

    // handleSelectRow = (row) => {
    //     this.setState(row);
    // }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/*<input placeholder="title" name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange}/>*/}
                {/*<input placeholder="name" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange}/>*/}
                <input placeholder="title" ref={node => this.brdtitle = node}/>
                <input placeholder="name" ref={node => this.brdwriter = node}/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default App;
