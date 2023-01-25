import React, { Component } from 'react';
import SongsTable from './SongsTable'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container} from 'reactstrap';
import DanceabilityScatterChart from "./DanceabilityScatterChart";
import DurationHistogram from "./DurationHistogram";
import AccousticBarChart from "./AccousticBarChart";
import TempoBarChart from "./TempoBarChart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      totalSize:0,
      activeTab: 'Danceability Scatter Chart'
    };
  }
  componentDidMount() {
    this.getSongsCount();
    this.fetchData(0,10);
  }
  fetchData = (currentPage, itemsPerPage) => {
    fetch(`http://localhost:8080/api/songs?page=${currentPage-1}&size=${itemsPerPage}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ data: data });
        })
        .catch(error => console.log(error));
  }

  getSongsCount = () => {
    fetch(`http://localhost:8080/api/songs/count`)
        .then(res => res.json())
        .then(data => {
          this.setState({ totalSize: data });
        })
        .catch(error => console.log(error));
  }

  fetchSong = (title)=>{
    fetch("http://localhost:8080/api/songs/title?name="+title)
        .then(res => res.json())
        .then(data => {
          this.setState({ data: data });
        })
        .catch(error => console.log(error));
  }

  handleChangeRating = (id, newRating) =>{
    let newData = this.state.data.map((song)=>{
      if(song.id===id) {
        let tempSong = {...song, starRating: newRating};
        return tempSong;
      }
      else{
        return song;
      }
    });
    this.setState({ data: newData });
    this.changeRating(id,newRating);
  }

  changeRating = (id, newRating) => {
    const data = newRating;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data
    };
    fetch("http://localhost:8080/api/songs/id/rate?id="+id, options)
        .catch(error => console.log(error));
  }

  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({ activeTab: tab });
  }
  render() {

    return (
      <Container>
      <Row>
        <Col sm="12">
          <SongsTable data={this.state.data} fetchData={this.fetchData}
                      handleChangeRating={this.handleChangeRating} fetchSong={this.fetchSong}
                      totalSize={this.state.totalSize}
          />
        </Col>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink
              className={this.state.activeTab === 'Danceability Scatter Chart' ? 'active' : ''}
              onClick={() => { this.toggle('Danceability Scatter Chart'); }}
          >
            Danceability Scatter Chart
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
              className={this.state.activeTab === 'Duration Histogram' ? 'active' : ''}
              onClick={() => { this.toggle('Duration Histogram'); }}
          >
            Duration Histogram
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
              className={this.state.activeTab === 'Accoustic Bar Chart' ? 'active' : ''}
              onClick={() => { this.toggle('Accoustic Bar Chart'); }}
          >
            Accoustic Bar Chart
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
              className={this.state.activeTab === 'Tempo Bar Chart' ? 'active' : ''}
              onClick={() => { this.toggle('Tempo Bar Chart'); }}
          >
            Tempo Bar Chart
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="Danceability Scatter Chart">
          <Row>
            <Col sm="12">
              <DanceabilityScatterChart data={this.state.data}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="Duration Histogram">
          <Row>
            <Col sm="12">
              <DurationHistogram data={this.state.data}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="Accoustic Bar Chart">
          <Row>
            <Col sm="12">
              <AccousticBarChart data={this.state.data}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="Tempo Bar Chart">
          <Row>
            <Col sm="12">
              <TempoBarChart data={this.state.data}/>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      </Container>
   );
  }
}

export default App;
