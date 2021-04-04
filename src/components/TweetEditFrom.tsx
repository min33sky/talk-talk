import { dbService } from 'fbase';
import React, { useState } from 'react';
import { TweetType } from 'typings/tweet';

interface IProps {
  tweet: TweetType;
  setEditing: (mode: boolean) => void;
}

/**
 * 트윗 수정 폼
 * @param Props tweet Data and edit mode change function
 * @returns Tweet Edit Form Component
 */
export default function TweetEditFrom({ tweet, setEditing }: IProps) {
  const [newTweet, setNewTweet] = useState(tweet.text);

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
  );
}
