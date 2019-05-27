import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";
import * as BookAPI from "./BookAPI";
import "./App.css";

class App extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BookAPI.getAll().then(book => {
      this.setState({
        books: book
      });
    });
  }

  moveShelf = (book, shelf) => {
    //console.log(book, "Here is helf", shelf);
    BookAPI.update(book, shelf);

    BookAPI.getAll().then(book => {
      this.setState({
        books: book
      });
    });
  };

  render() {
    //console.log(this.state.books);

    return (
      <div className="app">
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={() => (
              <MainPage books={this.state.books} moveShelf={this.moveShelf} />
            )}
          />
          <Route
            path="/search"
            exact
            render={() => (
              <SearchPage
                handleSearchQuery={this.handleSearchQuery}
                books={this.state.books}
                moveShelf={this.moveShelf}
              />
            )}
          />
          {/* <MainPage books={this.state.books} moveShelf={this.moveShelf} />*/}
          {/* <SearchPage
          handleSearchQuery={this.handleSearchQuery}
          books={this.state.books}
        /> */}
        </BrowserRouter>

        {/* <MainPage books={this.state.books} moveShelf={this.moveShelf} /> */}
        {/* <SearchPage
          handleSearchQuery={this.handleSearchQuery}
          books={this.state.books}
        />
       */}
      </div>
    );
  }
}

export default App;
