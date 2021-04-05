import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { dbService } from 'fbase';
import React, { useState } from 'react';
import { TweetType } from 'typings/tweet';

const ButtonStyle = css`
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
`;

const Form = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const EditButton = styled.input`
  margin-top: 15px;
  margin-bottom: 5px;
  ${ButtonStyle}
`;

const CancelButton = styled.button`
  ${ButtonStyle}
  max-width: 320px;
  background-color: tomato;
`;

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
    <>
      <Form onSubmit={onSubmit}>
        <input
          type="text"
          value={newTweet}
          onChange={onChange}
          required
          placeholder="Edit Your Tweet"
        />
        <EditButton type="submit" value="Update Tweet" />
      </Form>
      <CancelButton onClick={() => setEditing(false)}>Cancel</CancelButton>
    </>
  );
}
