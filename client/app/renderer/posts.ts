/*
 * Copyright (C) 2014 Kaj Magnus Lindberg (born 1979)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/// <reference path="../../shared/plain-old-javascript.d.ts" />
/// <reference path="../../typedefs/react/react.d.ts" />
/// <reference path="../../typedefs/moment/moment.d.ts" />

// Wrapping in a module causes an ArrayIndexOutOfBoundsException: null error, see:
//  http://stackoverflow.com/questions/26189940/java-8-nashorn-arrayindexoutofboundsexception
// The bug has supposedly been fixed in Java 8u40. Once I'm using that version,
// remove `var exports = {};` from app/debiki/ReactRenderer.scala.
//------------------------------------------------------------------------------
  // module debiki2.renderer {
module boo {
    export var buu = 'vovvar';
};
//------------------------------------------------------------------------------

var React = window['React']; // TypeScript file doesn't work
var r = React.DOM;
var $: JQueryStatic = debiki.internal.$;

var TitleId = 0;
var BodyPostId = 1;


function createComponent(componentDefinition) {
  return React.createFactory(React.createClass(componentDefinition));
}


var PageWithState = createComponent({
  mixins: [debiki2.StoreListenerMixin],

  getInitialState: function() {
    return debiki2.ReactStore.allData();
  },

  onChange: function() {
    this.setState(debiki2.ReactStore.allData());
  },

  render: function() {
    return Page(this.state);
  }
});


var Page = createComponent({
  render: function() {
    return (
      r.div({ className: 'debiki dw-debate dw-page' },
        TitleBodyComments(this.props)));
  }
});


var TitleBodyComments = createComponent({
  //getInitialState: function() {
    //return null; //debiki2.ReactStore.allData();
  //},
  /* any `getInitialState` causes a Nashorn error in react-with-addons.js, here:
  _renderValidatedComponent: ReactPerf.measure(
    'ReactCompositeComponent',
    '_renderValidatedComponent',
    function() {
      var renderedComponent;
      var previousContext = ReactContext.current;
      ReactContext.current = this._processChildContext(
        this._currentElement._context
      );
      ReactCurrentOwner.current = this;
      try {
        renderedComponent = this.render();   <-- render is null, in Nashorn only, not in browser
  */

  render: function() {
    return (
      r.div({},
        Title(this.props),
        RootPost(this.props)));
  },
});


var Title = createComponent({
  render: function() {
    var titlePost = this.props.allPosts[TitleId];
    var titleText = titlePost.isApproved
        ? titlePost.text
        : r.i({}, '(Title pending approval)');
    return (
      r.div({ className: 'dw-t', id: 'dw-t-0' },
        r.div({ className: 'dw-p dw-p-ttl', id: 'post-0' },
          r.div({ className: 'dw-p-bd' },
            r.div({ className: 'dw-p-bd-blk' },
              r.h1({ className: 'dw-p-ttl' }, titleText))))));
  },
});


var RootPost = createComponent({
  render: function() {
    var rootPost = this.props.allPosts[this.props.rootPostId];
    var isBody = this.props.rootPostId === BodyPostId;
    var threadClass = 'dw-t dw-depth-0' + horizontalCss(this.props.horizontalLayout);
    var postIdAttr = 'post-' + rootPost.postId;
    var postClass = 'dw-p';
    var postBodyClass = 'dw-p-bd';
    if (isBody) {
      threadClass += ' dw-ar-t';
      postClass += ' dw-ar-p';
      postBodyClass += ' dw-ar-p-bd';
    }

    var spaceForHorizontalArrows = null;
    if (this.props.horizontalLayout) {
      spaceForHorizontalArrows = r.div({ className: 'dw-t-vspace' });
    }

    var children = rootPost.childIds.map((childId) => {
      return (
        r.li({},
          Thread({
            allPosts: this.props.allPosts,
            user: this.props.user,
            postId: childId,
            depth: 1,
          })));
    });

    var rootPostText = rootPost.isApproved
        ? rootPost.text
        : r.i({}, '(Text pending approval.)');

    return (
      r.div({ className: threadClass },
        r.div({ className: postClass, id: postIdAttr },
          r.div({ className: postBodyClass },
            r.div({ className: 'dw-p-bd-blk' }, rootPostText))),
        PostActions({ post: rootPost, user: this.props.user }),
        debiki2.reactelements.CommentsToolbar(),
        spaceForHorizontalArrows,
        r.div({ className: 'dw-single-and-multireplies' },
          r.ol({ className: 'dw-res dw-singlereplies' },
            children))));
  },
});


var Thread = createComponent({
  render: function() {
    var post = this.props.allPosts[this.props.postId];
    var deeper = this.props.depth + 1;
    var depthClass = 'dw-depth-' + this.props.depth;

    var children = [];
    if (!post.isTreeCollapsed && !post.isTreeDeleted) {
      children = post.childIds.map((childId) => {
        return (
          r.li({},
            Thread({
              allPosts: this.props.allPosts,
              user: this.props.user,
              postId: childId,
              depth: deeper
            })));
      });
    }

    var actions = isCollapsed(post)
      ? null
      : actions = PostActions({ post: post, user: this.props.user });

    return (
      r.div({ className: 'dw-t ' + depthClass },
        Post({ post: post, user: this.props.user }),
        actions,
        r.div({ className: 'dw-single-and-multireplies' },
          r.ol({ className: 'dw-res dw-singlereplies' },
            children))));
  },
});


var Post = createComponent({
  onUncollapseClick: function(event) {
    debiki2.ReactActions.uncollapsePost(this.props.post);
  },
  render: function() {
    var post = this.props.post;
    var user = this.props.user;

    var pendingApprovalElem;
    var headerElem;
    var bodyElem;
    var extraClasses = '';

    if (post.isTreeDeleted || post.isPostDeleted) {
      var what = post.isTreeDeleted ? 'Thread' : 'Comment';
      headerElem = r.div({ className: 'dw-p-hd' }, what, ' deleted');
      extraClasses += ' dw-p-dl';
    }
    else if (post.isTreeCollapsed || post.isPostCollapsed) {
      var what = post.isTreeCollapsed ? 'more comments' : 'this comment';
      bodyElem = r.a({ className: 'dw-z', onClick: this.onUncollapseClick },
          'Click to show ', what);
      extraClasses += ' dw-zd';
    }
    else if (!post.isApproved && !post.text) {
      headerElem = r.div({ className: 'dw-p-hd' }, 'Hidden comment pending approval, posted ',
            moment(post.createdAt).from(this.props.now), '.');
      extraClasses += ' dw-p-unapproved';
    }
    else {
      if (!post.isApproved) {
        var the = post.authorId === user.userId ? 'Your' : 'The';
        pendingApprovalElem = r.div({ className: 'dw-p-pending-mod',
            onClick: this.onUncollapseClick }, the, ' comment below is pending approval.');
      }
      headerElem = PostHeader(this.props);
      bodyElem = PostBody(this.props);
    }

    return (
      r.div({ className: 'dw-p' + extraClasses, id: 'post-' + post.postId },
        pendingApprovalElem,
        headerElem,
        bodyElem));
  }
});


var PostHeader = createComponent({
  render: function() {
    var post = this.props.post;

    var authorUrl = '/-/users/#/id/' + this.props.authorId;
    var authorNameElems;
    if (post.authorFullName && post.authorUsername) {
      authorNameElems = [
        r.span({ className: 'dw-username' }, post.authorUsername),
        r.span({ className: 'dw-fullname' }, ' (', post.authorFullName, ')')];
    }
    else if (post.authorFullName) {
      authorNameElems = r.span({ className: 'dw-fullname' }, post.authorFullName);
    }
    else if (post.authorUsername) {
      authorNameElems = r.span({ className: 'dw-username' }, post.authorUsername);
    }
    else {
      authorNameElems = r.span({}, '(Unknown author)');
    }

    var createdAt = moment(post.createdAt).from(this.props.now);

    var editInfo = null;
    if (post.lastEditAppliedAt) {
      var editedAt = moment(post.lastEditAppliedAt).from(this.props.now);
      var byVariousPeople = post.numEditors > 1 ? ' by various people' : null;
      editInfo =
        r.span({}, ', edited ', editedAt, byVariousPeople);
    }

    function numPeople(num) {
      if (voteInfo) {
        return num + ' ';
      }
      else {
        return num > 1 ? num + ' people ' : num + ' person ';
      }
    }
    function thisComment() {
      return voteInfo ? ' it ' : ' this comment ';
    }
    var voteInfo = '';
    if (post.numLikeVotes) {
      voteInfo += numPeople(post.numLikeVotes) +
        (post.numWrongVotes == 1 ? 'likes' : 'like') + ' this comment';
    }
    if (post.numWrongVotes) {
      if (voteInfo.length > 0) voteInfo += ', ';
      voteInfo += numPeople(post.numWrongVotes) +
        (post.numWrongVotes == 1 ? 'thinks' : 'think') + thisComment() + 'is wrong';
    }
    if (post.numOffTopicVotes) {
      if (voteInfo.length > 0) voteInfo += ', ';
      voteInfo += numPeople(post.numOffTopicVotes) +
          (post.numOffTopicVotes == 1 ? 'thinks' : 'think') + thisComment() + 'is off-topic';
    }
    if (voteInfo) voteInfo += '.';

    return (
        r.div({ className: 'dw-p-hd' },
          r.a({ className: 'dw-p-link' }, '#', post.postId),
          r.a({ className: 'dw-p-by', href: authorUrl }, authorNameElems),
          createdAt,
          editInfo, '. ',
          voteInfo));
  }
});


var PostBody = createComponent({
  render: function() {
    var post = this.props.post;
    return (
      r.div({ className: 'dw-p-bd' },
        r.div({ className: 'dw-p-bd-blk' }, post.text)));
  }
});


var PostActions = createComponent({
  onReplyClick: function(event) {
    debiki.internal.$showReplyForm.call(event.target, event);
  },
  onLikeClick: function(event) {
    debiki.internal.$toggleVote('VoteLike').call(event.target, event);
  },
  onWrongClick: function(event) {
    debiki.internal.$toggleVote('VoteWrong').call(event.target, event);
  },
  onOffTopicClick: function(event) {
    debiki.internal.$toggleVote('VoteOffTopic').call(event.target, event);
  },
  onEditClick: function(event) {
    debiki.internal.$showEditsDialog.call(event.target, event);
  },
  onFlagClick: function(event) {
    debiki.internal.$showFlagForm.call(event.target, event);
  },
  onDeleteClick: function(event) {
    debiki.internal.$showDeleteForm.call(event.target, event);
  },
  onCollapsePostClick: function(event) {
    debiki.internal.$showActionDialog('CollapsePost').call(event.target, event);
  },
  onCollapseTreeClick: function(event) {
    debiki.internal.$showActionDialog('CollapseTree').call(event.target, event);
  },
  onCloseTreeClick: function(event) {
    debiki.internal.$showActionDialog('CloseTree').call(event.target, event);
  },
  onPinClick: function(event) {
    debiki.internal.$showActionDialog('PinTree').call(event.target, event);
  },

  render: function() {
    var post = this.props.post;

    if (!post.isApproved && !post.text)
      return null;

    var user = this.props.user;
    var isOwnPost = post.authorId === user.userId;
    var votes = user.votes[post.postId] || [];

    var deletedOrCollapsed =
      post.isPostDeleted || post.isTreeDeleted || post.isPostCollapsed || post.isTreeCollapsed;

    var replyLikeWrongLinks = null;
    if (!deletedOrCollapsed) {
      // They float right, so they're placed in reverse order.
      var myLikeVote = votes.indexOf('VoteLike') !== -1 ? ' dw-my-vote' : ''
      var myWrongVote = votes.indexOf('VoteWrong') !== -1 ? ' dw-my-vote' : ''

      replyLikeWrongLinks = [
          r.a({ className: 'dw-a dw-a-wrong icon-warning' + myWrongVote,
            title: 'Click if you think this post is wrong', onClick: this.onWrongClick },
            'Wrong')];

      if (!isOwnPost) {
        replyLikeWrongLinks.push(
          r.a({ className: 'dw-a dw-a-like icon-heart' + myLikeVote,
            title: 'Like this', onClick: this.onLikeClick }, 'Like'));
      }

      replyLikeWrongLinks.push(
        r.a({ className: 'dw-a dw-a-reply icon-reply', onClick: this.onReplyClick }, 'Reply'));
    }

    var moreLinks = [];

    var myOffTopicVote = votes.indexOf('VoteOffTopic') !== -1 ? ' dw-my-vote' : ''
    moreLinks.push(
        r.a({ className: 'dw-a dw-a-offtopic icon-split' + myOffTopicVote,
            title: 'Click if you think this post is off-topic', onClick: this.onOffTopicClick },
          'Off-Topic'));

    moreLinks.push(
        r.a({ className: 'dw-a dw-a-flag icon-flag', onClick: this.onFlagClick }, 'Report'));

    moreLinks.push(
        r.a({ className: 'dw-a dw-a-pin icon-pin', onClick: this.onPinClick }, 'Pin'));

    var suggestionsOld = [];
    var suggestionsNew = [];

    if (post.numPendingEditSuggestions > 0)
      suggestionsNew.push(
          r.a({ className: 'dw-a dw-a-edit icon-edit dw-a-pending-review',
           title: 'View edit suggestions', onClick: this.onEditClick },
            '×', post.numPendingEditSuggestions));

    // TODO [react]
    // suggestionsNew.push(renderUncollapseSuggestions(post))

    if (!post.isPostCollapsed && post.numCollapsePostVotesPro > 0)
      suggestionsNew.push(
        r.a({ className:'dw-a dw-a-collapse-suggs icon-collapse-post dw-a-pending-review',
          title: 'Vote for or against collapsing this comment' }, '×',
            post.numCollapsePostVotesPro, '–', post.numCollapsePostVotesCon));

    if (!post.isTreeCollapsed && post.numCollapseTreeVotesPro > 0)
      suggestionsNew.push(
        r.a({ className: 'dw-a dw-a-collapse-suggs icon-collapse-tree dw-a-pending-review',
          title: 'Vote for or against collapsing this whole thread' }, '×',
            post.numCollapseTreeVotesPro, '–', post.numCollapseTreeVotesCon));

    // People should upvote any already existing suggestion, not create
    // new ones, so don't include any action link for creating a new suggestion,
    // if there is one already. Instead, show a link you can click to upvote
    // the existing suggestion:

    if (!post.isTreeCollapsed && !post.numCollapseTreeVotesPro)
      moreLinks.push(
        r.a({ className: 'dw-a dw-a-collapse-tree icon-collapse',
            onClick: this.onCollapseTreeClick }, 'Collapse tree'));

    if (!post.isPostCollapsed && !post.numCollapsePostVotesPro)
      moreLinks.push(
        r.a({ className: 'dw-a dw-a-collapse-post icon-collapse',
            onClick: this.onCollapsePostClick }, 'Collapse post'));

    if (post.isTreeCollapsed && !post.numUncollapseTreeVotesPro)
      moreLinks.push(
        r.a({ className: 'dw-a dw-a-uncollapse-tree' }, 'Uncollapse tree'));

    if (post.isPostCollapsed && !post.numUncollapsePostVotesPro)
      moreLinks.push(
        r.a({ className: 'dw-a dw-a-uncollapse-post' }, 'Uncollapse post'));

    // ----- Close links

    if (post.isTreeClosed) {
      moreLinks.push(
        r.a({ className: 'dw-a dw-a-reopen-tree' }, 'Reopen'));
    }
    else {
      moreLinks.push(
        r.a({ className: 'dw-a dw-a-close-tree icon-archive',
            onClick: this.onCloseTreeClick }, 'Close'));
    }

    // ----- Move links

    // ? <a class="dw-a dw-a-move">Move</a>

    // ----- Delete links

    if (!post.isPostDeleted && post.numDeletePostVotesPro > 0) {
      suggestionsNew.push(
        r.a({ className: 'dw-a dw-a-delete-suggs icon-delete-post dw-a-pending-review',
          title: 'Vote for or against deleting this comment' }, '×',
            post.numDeletePostVotesPro, '–', post.numDeletePostVotesCon));
    }

    if (!post.isTreeDeleted && post.numDeleteTreeVotesPro > 0) {
      suggestionsNew.push(
        r.a({ className: 'dw-a dw-a-delete-suggs icon-delete-tree dw-a-pending-review',
          title: 'Vote for or against deleting this whole thread' }, '×',
            post.numDeleteTreeVotesPro, '–', post.numDeleteTreeVotesCon));
    }

    if (!post.numDeleteTreeVotesPro || !post.numDeletePostVotesPro) {
      moreLinks.push(
        r.a({ className: 'dw-a dw-a-delete icon-trash', onClick: this.onDeleteClick }, 'Delete'));
    }

    var moreDropdown =
      r.span({ className: 'dropdown navbar-right dw-a' },
        r.a({ className: 'dw-a-more', 'data-toggle': 'dropdown' }, 'More'),
        r.div({ className: 'dropdown-menu dw-p-as-more' },
          moreLinks));

    return (
      r.div({ className: 'dw-p-as dw-as' },
        suggestionsNew,
        suggestionsOld,
        moreDropdown,
        replyLikeWrongLinks));
  }
});


function horizontalCss(horizontal) {
    return horizontal ? ' dw-hz' : '';
}


function isCollapsed(post) {
  return post.isTreeCollapsed || post.isPostCollapsed;
}


function renderTitleBodyComments() {
  var root = document.getElementById('dwPosts');
  if (!root)
    return;

  var millisBefore = new Date().getTime();
  React.render(PageWithState(), root);
  var millisAfter = new Date().getTime();
  console.debug('Renering React took: ' + (millisAfter - millisBefore) + ' ms');
}


function renderTitleBodyCommentsToString() {
  return React.renderToString(Page(debiki2.ReactStore.allData()));
}

//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// vim: fdm=marker et ts=2 sw=2 tw=0 list
