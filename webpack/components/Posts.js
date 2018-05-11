import React, { Component } from 'react';
import Card from './Card';
import MasonryLayout from './MasonryLayout';
import Loading from 'react-loading-components';

const POST_BATCH_LIMIT = 4;

class Posts extends Component {
  state = {
    elements: [],
    loadedPostIds: [],
    hasMore: true,
    loading: false,
    imageLoaded: false,
    count: 0,
    initialCount: 0,
    lastId: null
  };

  componentWillMount() {
    this.setState({
      count: this.props.count,
      initialCount: this.props.count
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.props.firebase.ref('posts').orderByKey().limitToLast(1).once('child_added', snapshot => {
        const newPost = snapshot.val();
        this.state.elements.unshift({
          key: snapshot.key,
          author: newPost.author,
          message: newPost.message,
          upvote: newPost.upvote,
          image: newPost.image
        });
        this.state.loadedPostIds.push(this.props.count);
        this.setState({
          elements: this.state.elements,
          loadedPostIds: this.state.loadedPostIds
        });
      });
    }
  }

  imageLoaded = () => {
    this.setState({ imageLoaded: !this.state.imageLoaded });
  };

  getCards = () => {
    if (this.state.loading || this.state.initialCount === 0) {
      return;
    }

    this.setState({ loading: true });

    if (this.state.count <= 0) {
      this.setState({ hasMore: false, loading: false });
      return;
    }

    let query = this.props.firebase.ref('posts').orderByKey();
    if (this.state.lastId !== null) {
      query = query.endAt(this.state.lastId);
    }
    query.limitToLast(POST_BATCH_LIMIT).once('value', snapshot => {
      let posts = [];
      let loadedPostIds = [];
      if (snapshot.numChildren() > 0) {
        snapshot.forEach(post => {
          if (this.state.loadedPostIds.indexOf(post.key) === -1) {
            loadedPostIds.push(post.key);
            posts.push({
              key: post.key,
              author: post.val().author,
              message: post.val().message,
              upvote: post.val().upvote,
              image: post.val().image
            });
          }
        });

        if (posts.length > 0) {
          let lastId = null;
          if (this.state.count - (POST_BATCH_LIMIT - 1) > 0) {
            lastId = posts.splice(0, 1)[0].key;
            const indexOfLastId = loadedPostIds.indexOf(lastId);
            if (indexOfLastId > -1) {
              loadedPostIds.splice(indexOfLastId, 1);
            }
          }

          posts = posts.reverse();

          this.setState({
            elements: this.state.elements.length > 0 ? this.state.elements.concat(posts) : posts,
            loadedPostIds: this.state.loadedPostIds.concat(loadedPostIds),
            lastId: lastId,
            count: this.state.count - (POST_BATCH_LIMIT - 1),
            loading: false
          });
        }
      } else {
        this.setState({ hasMore: false, loading: false });
      }
    });
  };

  render() {
    return (
      <div>
        <MasonryLayout
          id="masonry"
          className="masonry"
          infiniteScroll={this.getCards}
          infiniteScrollLoading={this.state.loading}
          infiniteScrollEnd={!this.state.hasMore}
          infiniteScrollEndIndicator={null}
          infiniteScrollSpinner={null}
        >
          {Object.keys(this.state.elements).map(key => {
            const post = this.state.elements[key];
            return (
              <div className="card" key={post.key} >
                <Card
                  post={post}
                  firebase={this.props.firebase}
                  onImageLoaded={this.imageLoaded}
                />
              </div>
            );
          })}
        </MasonryLayout>
        <Loading type='hearts' width={100} height={100} fill='#f44242' />
      </div>
    );
  }
}

export default Posts;
