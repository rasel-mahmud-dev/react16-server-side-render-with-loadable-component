import React from "react";
import { connect } from 'react-redux'
import {  fetchNews } from '../../store/actions'

class News extends React.Component {

  componentDidMount() {
    if (!this.props.news || this.props.news.length <= 0){   
      this.props.dispatch(News.initialAction());
    }
  }
  
  static initialAction(){
    return fetchNews()
  }


  render() {
    return (
      <div>
        <h1>News</h1>
        {
          this.props.news &&
          this.props.news.length > 0 &&
          this.props.news.map((news)=><li key={news}> {news} </li>)
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  news: state.news
})


export default connect(mapStateToProps)(News);
