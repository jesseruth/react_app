import React, {Component} from 'react';
import './App.css';
import faker from 'faker';
import {Column, Table} from 'react-virtualized';
import {Intent, TextArea} from "@blueprintjs/core";

function generateData() {
  const numberOfRows = 1000;
  let rowsProcessed = 0;
  const data = [];
  while (rowsProcessed < numberOfRows) {
    rowsProcessed = rowsProcessed + 1;

    const newRow = {
      name: faker.name.findName(),
      title: faker.name.jobTitle(),
      id: faker.random.number(),
    };

    data.push(newRow);
    console.log(newRow);
  }
  return data;
}

const tableData = generateData();

class App extends Component {
  state = {
    value: '',
  };
  handleChange = (event) => {
    console.log(event);
    this.setState({value: event.target.value});
  };

  render() {
    let table;
    const filteredDate = tableData
      .filter(row => row.name.toLocaleLowerCase().includes(this.state.value.toLocaleLowerCase()));
    if (filteredDate) {
      table = (<Table
        width={800}
        height={600}
        headerHeight={20}
        rowHeight={60}
        rowCount={filteredDate.length}
        rowGetter={({index}) => filteredDate[index]}
      >
        <Column
          label='Name'
          dataKey='name'
          width={200}
        />
        <Column
          width={200}
          label='Description'
          dataKey='id'
        />
      </Table>)
    }

    return (
      <div className="App">
        <div>
          <TextArea
            large={true}
            intent={Intent.PRIMARY}
            onChange={this.handleChange}
            value={this.state.value}
          />
        </div>
        <div>
          {table}
        </div>
      </div>
    );
  }
}

export default App;
