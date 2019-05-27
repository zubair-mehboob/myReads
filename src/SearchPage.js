import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BookAPI from "./BookAPI";
class SearchPage extends Component {
  _isMounted = false;
  state = {
    query: "",
    searchedBooks: []
  };

  //console.log(query);

  // componentDidMount() {
  handleSearchQuery = query => {
    this.setState({
      query: query
    });
    this.updateSearchResult(query);
  };

  updateSearchResult(query) {
    if (query) {
      BookAPI.search(query).then(searchedBooks => {
        if (searchedBooks.error === "empty query") {
          console.log("error mil gya bhai");

          this.setState({ searchedBooks: [] });
        } else {
          this.setState({
            searchedBooks: searchedBooks
          });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" />
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.handleSearchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map(searchBook => {
              let shelf = "none";

              this.props.books.map(book => {
                return book.id == searchBook.id ? (shelf = book.shelf) : "none";
              });
              return (
                <li key={searchBook.id}>
                  <Book
                    book={searchBook}
                    moveShelf={this.props.moveShelf}
                    currentShelf={shelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
