import React, { Component } from "react";

class Book extends Component {
  state = {};
  render() {
    const imgURL = this.props.book.imageLinks
      ? this.props.book.imageLinks.thumbnail
      : "";
    console.log(this.props);
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imgURL}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={
                event =>
                  this.props.moveShelf(this.props.book, event.target.value) //to update the value of shelf
              }
              value={this.props.currentShelf} //to select the current option of the shelf
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {this.props.book.authors.map(a => a)}
        </div>
      </div>
    );
  }
}

export default Book;
