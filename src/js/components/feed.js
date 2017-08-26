require("../../css/feed.scss");

import React from "react"
import FeedStore from "../stores/feed_store"
import FeedItem from "./feed_item"

export default class Feed extends React.Component {
  update() {
    this.forceUpdate();
  }

  componentWillMount() {
    FeedStore.listen(this.update.bind(this));
  }

  componentWillUnmount() {
    FeedStore.unlisten(this.update.bind(this));
  }

  render() {
    let feedItems = FeedStore.getFeedItems();

    feedItems = _.map(feedItems, (item) => {
      return <FeedItem key={item.id} feedItem={item} />;
    });

    return (
      <div id="feed-menu" className="row">
        <h3>Live Feed</h3>
        <div className="feed-items">
          {feedItems}
        </div>
      </div>
    );
  }
}
