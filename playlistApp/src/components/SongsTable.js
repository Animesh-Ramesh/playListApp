import React, { Component } from 'react';
import '../css/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import StarRating from './StarRating'
const { ExportCSVButton } = CSVExport;

class SongsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search:false,
            columns: [{
                dataField: 'id',
                text: 'ID',
                sort: true,
                classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'title',
                text: 'Title',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'danceability',
                text: 'Danceability',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'energy',
                text: 'Energy',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'mode',
                text: 'Mode',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'acousticness',
                text: 'Acousticness',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'tempo',
                text: 'Tempo',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'duration_ms',
                text: 'Duration (ms)',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'num_sections',
                text: 'Number of Sections',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'num_segments',
                text: 'Number of Segments',
                sort: true,classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                }
            }, {
                dataField: 'starRating',
                text: 'Star Rating',
                sort: true,
                classes: 'overflow-ellipsis',
                attrs: function callback(cell, row, rowIndex, colIndex){
                    return {title: cell}
                },
                formatter: (cell, row) => <StarRating rating={cell} song={row} updateRating={this.props.handleChangeRating}></StarRating>
            }],
            currentPage: 1,
            itemsPerPage: 10,
            sortField: 'title',
            sortOrder: 'asc',
            title:""
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.currentPage !== this.state.currentPage || prevState.itemsPerPage !== this.state.itemsPerPage){
            this.props.fetchData(this.state.currentPage,this.state.itemsPerPage);
        }
    }


    handlePageChange = (page, sizePerPage) => {
        this.setState({
            currentPage: page
        });
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.title!==""){
            this.setState({search:true});
            this.props.fetchSong(this.state.title);
        }
    }



    handleTableChange = (type, { sortField, sortOrder, data, page, sizePerPage }) => {
        // Update the state with the new sorting, filtering, and pagination information
        this.setState({
            data: data,
            currentPage: page,
            itemsPerPage: sizePerPage,
            sortField: sortField,
            sortOrder: sortOrder
        });
    }

    sortData = (data, sortField, sortOrder) => {
        return data.sort((a, b) => {
            if(sortOrder === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        });
    }

    handleClear = () => {
        this.setState({title:"",search:false});
        this.props.fetchData(this.state.currentPage,this.state.itemsPerPage);
    };

    render() {
        return (
            <div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input type="text" name="title" id="title" placeholder="Enter song title" onChange={this.handleTitleChange} value={this.state.title} />
                        </FormGroup>
                        <Button type="submit">Get Song</Button>
                        <Button type="button" onClick={this.handleClear}>
                            Clear
                        </Button>
                    </Form>
                </div>
                <ToolkitProvider
                    keyField='id'
                    data={this.sortData(this.props.data, this.state.sortField, this.state.sortOrder)}
                    columns={this.state.columns}
                    exportCSV={{
                        exportAll : false
                    }}
                >
                    {
                        props => (
                            <div>
                                <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                                <hr />
                                <BootstrapTable { ...props.baseProps}
                                                pagination={paginationFactory({
                                                    page: this.state.currentPage,
                                                    sizePerPage: this.state.itemsPerPage,
                                                    onPageChange: this.handlePageChange,
                                                    totalSize : !this.state.search?this.props.totalSize:this.props.data.length,
                                                    hideSizePerPage: true
                                                })}
                                                noDataIndication='No songs found'
                                                remote={ { pagination: true, filter: false, sort: false }}
                                                onTableChange={this.handleTableChange}
                                                sort={{ dataField: this.state.sortField, order: this.state.sortOrder }}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}
export default SongsTable;
