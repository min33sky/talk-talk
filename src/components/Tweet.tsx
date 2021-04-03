import React, { useState } from 'react';
import { dbService } from 'fbase';
import { TweetType } from 'typings/tweet';

interface IProps {
  tweet: TweetType;
  isOwner: boolean;
}

export default function Tweet({ tweet, isOwner }: IProps) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweet.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('이 트윗을 삭제하시겠습니까?');
    if (ok) {
      await dbService.doc(`tweets/${tweet.id}`).delete();
      console.log('삭제되었습니다.');
    }
  };

  const onEditClick = () => {
    setEditing(true);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dbService.doc(`tweets/${tweet.id}`).update({
      text: newTweet,
    });

    setEditing(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };

  return (
    <div>
      {editing && (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newTweet}
              onChange={onChange}
              required
              placeholder="Edit Your Tweet"
            />
            <input type="submit" value="Update Tweet" />
          </form>
        </>
      )}
      <h4>{tweet.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button onClick={onEditClick}>Edit Tweet</button>
        </>
      )}
    </div>
  );
}
