import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props){
        super(props);
        console.log("I am a constructor from News class");
        this.state = {
            articles: [],
            loading: true,
            page: 2,
            totalResults: 0,
        }
        document.title = this.capitalizeFirstLetter(this.props.category) + " - Tanmay's News"
    }

    capitalizeFirstLetter(cat) {
        return cat.charAt(0).toUpperCase()+cat.slice(1);
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.props.setProgress(40);
        this.setState({loading: true})
        let data = await fetch(url);
        this.props.setProgress(70);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            });
            this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }
    // async function can wait for some promises to resolve inside itss body.
    // so basically, as we have given 'await' to fetch(url), the function componentDidMount will wait for the promises to be resolved
    // by fetch i.e., until the data gets fetched and converted to text or json properly completely.

    handlePrevious = async () =>{
        await this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }

    handleNext = async () =>{
        await this.setState({
            page: this.state.page + 1
        })
        this.updateNews();
    }

    fetchMoreData = async () => {
        await this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            });
    }


  render() {
    return ( 
      <>
        <h1 className="text-center my-5">Tanmay's News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader = {<Spinner/>}
        >
        <div className="container my-5">
        <div className="row">
        {/*!this.state.loading &&*/} {this.state.articles.map((element, index)=>{
           return <div className="col-md-4" key={index}>
            {/* key is a unique key prop that we need to give to every element while iterating using .map. And in our case, url is a unique item */}
             <NewsItems title={element.title?element.title.slice(0, 40):""} desc= {element.description?(element.description.slice(0, 90))+" ...":""} 
                        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           </div> 
        })}
        </div>
        </div>
         </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePrevious}> &larr; Previous</button>
            <button type="button" className="btn btn-dark" disabled={Math.ceil(this.state.totalResults/this.props.pageSize)<=this.state.page} onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News