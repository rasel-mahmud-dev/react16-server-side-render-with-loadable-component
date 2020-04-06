import React from "react";

class News extends React.Component {

  constructor(props){
    super(props)

    let initialData;
    if(props.staticContext){
      initialData = props.staticContext.initialData
    } else {
      initialData = window.__initialData__;
      delete window.__initialData__;
    }
    this.state={
      news: initialData || []
    }
  }
  

  static requestInitialData(){
    return fetch('http://localhost:3000/api/news')
      .then(response=> response.json())
  }

  // when render browser side react
  componentDidMount() {
    fetch('http://localhost:3000/api/news')
    .then(response=> response.json())
    .then(news=>{
      this.setState({news})
    })
  }
  

  render() {
    return (
      <div>
        <h1>News</h1>
        {
          this.state.news &&
          this.state.news.length > 0 &&
          this.state.news.map((news)=><li key={news}> {news} </li>)
        }
      </div>
    );
  }
}

export default News;
