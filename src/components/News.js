import React, {Component} from 'react'
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            totalResults: 0,
            page: 1

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`

    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b8fed8c39fe45168801f17309872d90&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData)
        this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews()
    }

    handlePrevClick = async () => {
        this.setState({page: this.state.page - 1});
        this.updateNews();

    }
    handleNextClick = async () => {
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b8fed8c39fe45168801f17309872d90&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData)
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults
        })

    }

    render() {
        return (
            <div>
                <h1 className="text-center">NewsMonkey -
                    Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : " "}
                                              discription={element.description ? element.description.slice(0, 88) : " "}
                                              imageURL={element.urlToImage} newsURL={element.url}
                                              author={element.author} date={element.publishedAt}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
