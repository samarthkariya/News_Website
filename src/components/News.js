import React, {Component} from 'react'
import NewsItem from "./NewsItem";

export class News extends Component {
    constructor() {
        super();
        this.state ={
            articles: [],
            loading:false,
            totalResults:0,
            page:1
        }
    }

    async updateNews(){
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b8fed8c39fe45168801f17309872d90&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData)
        this.setState({articles:parseData.articles,totalResults:parseData.totalResults})
    }
    async componentDidMount() {
        this.updateNews()
    }

    handlePrevClick= async ()=>{
        this.setState({page:this.state.page-1});
        this.updateNews();

    }
    handleNextClick= async ()=>{

        // if (this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize)){
        //
        // }else {
        //     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b8fed8c39fe45168801f17309872d90&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     let data = await fetch(url);
        //     let parseData = await data.json()
        //     console.log(parseData)
        //     this.setState({articles: parseData.articles, page: this.state.page + 1})
        // }

        this.setState({page:this.state.page+1});
        this.updateNews();
    }
    render() {
        return (
            <div>
                <div className="container my-3">
                <h1 className="text-center">News Monkey -Top Headlines</h1>
                    <div className="row">
                        {this.state.articles.map((element) => {
                           return <div className="col md-4" key={element.url}>
                               <NewsItem title={element.title?element.title.slice(0,45):" "} discription={element.description?element.description.slice(0,88):" "}
                                         imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt}/>
                           </div>})}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>

            </div>
            </div>
        )
    }
}

export default News
