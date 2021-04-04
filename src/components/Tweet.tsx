import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { TweetType } from 'typings/tweet';
import TweetEditFrom from './TweetEditFrom';

interface IProps {
  tweet: TweetType;
  isOwner: boolean;
}

/**
 * 트윗 컴포넌트
 * @param props tweet, isOwner
 * @returns Tweet Component
 */
export default function Tweet({ tweet, isOwner }: IProps) {
  const [editing, setEditing] = useState(false);

  const onDeleteClick = async () => {
    const ok = window.confirm('이 트윗을 삭제하시겠습니까?');
    if (ok) {
      if (tweet.attachmentURL) {
        await storageService.refFromURL(tweet.attachmentURL).delete();
      }
      await dbService.doc(`tweets/${tweet.id}`).delete();
    }
  };

  const onEditClick = () => setEditing(true);

  return (
    <div>
      {editing && <TweetEditFrom tweet={tweet} setEditing={setEditing} />}

      <h4>{tweet.text}</h4>

      {tweet.attachmentURL && (
        <img src={tweet.attachmentURL} width="50px" height="50px" alt="tweetImage" />
      )}

      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button onClick={onEditClick}>Edit Tweet</button>
        </>
      )}
    </div>
  );
}
