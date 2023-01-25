import React, { Component } from 'react';

class StarRating extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(newRating) {
        this.props.updateRating(this.props.song.id,newRating);
    }

    render() {
        return (
            <div>
                {[1, 2, 3, 4, 5].map((star, index) => (
                    <span
                        key={index}
                        onClick={() => this.handleClick(star)}
                        style={{ color: this.props.rating >= star ? 'orange' : 'black' }}
                    >
            &#9733;
          </span>
                ))}
            </div>
        );
    }
}

export default StarRating;
