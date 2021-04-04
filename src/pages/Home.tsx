import React, { useEffect, useState } from 'react';
import Tweet from 'components/Tweet';
import TweetForm from 'components/TweetForm';
import { useAuthState } from 'contexts/auth';
import { dbService } from 'fbase';
import { TweetType } from 'typings/tweet';

/**
 * Main Page
 * URL: /
 * @returns Home Component
 */
export default function Home() {
  const { currentUser } = useAuthState();
  const [tweets, setTweets] = useState<TweetType[]>([]); // Tweet Datas from Firestore

  useEffect(() => {
    // ? DB가 업데이트 될 때마다 호출되는 이벤트 리스너
    const unSubscribe = dbService
      .collection('tweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const tweetDatas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TweetType[];

        setTweets(tweetDatas);
      });

    return () => unSubscribe();
  }, []);

  return (
    <div>
      <TweetForm />
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} isOwner={tweet.creatorId === currentUser?.uid} />
        ))}
      </div>
    </div>
  );
}
