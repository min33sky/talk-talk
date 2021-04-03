import Tweet from 'components/Tweet';
import { useAuthState } from 'contexts/auth';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { TweetType } from 'typings/tweet';

export default function Home() {
  const { currentUser } = useAuthState();
  const [message, setMessage] = useState('');
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    // ? DB가 업데이트 될 때마다 호출되는 이벤트 리스너
    dbService
      .collection('tweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const tweetData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TweetType[];

        setTweets(tweetData);
      });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dbService.collection('tweets').add({
      text: message,
      createdAt: Date.now(),
      creatorId: currentUser?.uid,
    });
    setMessage('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <h2>Home</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={message}
          onChange={onChange}
        />
        <input type="submit" value="Send" />
      </form>

      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} isOwner={tweet.creatorId === currentUser?.uid} />
        ))}
      </div>
    </div>
  );
}
