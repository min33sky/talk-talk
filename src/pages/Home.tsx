import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { TweetType } from 'typings/tweet';

export default function Home() {
  const [message, setMessage] = useState('');
  const [tweets, setTweets] = useState<TweetType[]>([]);

  const getTweets = async () => {
    const tweetsData = await dbService.collection('tweets').get();
    tweetsData.forEach((tweetData) => {
      // ? 응답받은 객체에 id값을 추가
      const tweetObject = {
        id: tweetData.id,
        ...tweetData.data(),
      } as TweetType;

      setTweets((prev) => [tweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getTweets();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dbService.collection('tweets').add({
      tweet: message,
      createdAt: Date.now(),
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
        {tweets.map((tweet: any) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
