import React from 'react';

class RecipeReviewCard extends React.Component {
  componentWillMount() {
    if (this.postAlreadyLiked()) {
      this.setState({ liked: true });
    }
    this.setState({ likeCount: this.props.post.upvote });
  }

  state = {
    liked: false,
    likeCount: 0
  };

  handleUpvote = (e) => {
    if (this.state.liked) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    const { firebase, post } = this.props;

    firebase.ref('posts/' + post.key).set({
      author: post.author,
      message: post.message,
      image: post.image,
      upvote: post.upvote + 1
    });

    this.saveLikedInSession();
    this.setState({
      liked: true,
      likeCount: this.state.likeCount + 1
    });
  };

  saveLikedInSession = () => {
    let liked = window.localStorage.getItem('liked');
    if (!liked) {
      liked = {};
    } else {
      liked = JSON.parse(liked);
    }
    liked[this.props.post.key] = true;
    window.localStorage.setItem('liked', JSON.stringify(liked));
  };

  postAlreadyLiked = () => {
    let liked = window.localStorage.getItem('liked');
    if (!liked) {
      return false;
    }
    liked = JSON.parse(liked);
    return liked[this.props.post.key] === true;
  };

  render() {
    const { post, onImageLoaded } = this.props;
    const likedIcon = <i className="fa fa-heart Instagram-heart-icon-liked" aria-hidden="true" onClick={this.handleUpvote} />;
    const regularIcon = <i className="fa fa-heart-o Instagram-heart-icon" aria-hidden="true" onClick={this.handleUpvote} />;
    const icon = this.state.liked ? likedIcon : regularIcon;
    
    return (
      <div className="Instagram-card">
        <div className="Instagram-card-image">
          <img
            src={post.image}
            onLoad={onImageLoaded}
          />
        </div>
        <div className="Instagram-card-content">
          <p className="Likes">
            {icon} {this.state.likeCount} likes
          </p>
          <div>
            <p className="Instagram-card-content-user">{post.author}</p>
            <p className="Instagram-card-content-message">{post.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeReviewCard;
