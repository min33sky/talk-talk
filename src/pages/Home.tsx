import { useAuthState } from 'contexts/auth';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { TweetType } from 'typings/tweet';

export default function Home() {
  const { currentUser } = useAuthState();
  const [message, setMessage] = useState('');
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    dbService.collection('tweets').onSnapshot((snapshot) => {
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
          <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
