import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { TweetType } from 'typings/tweet';
import styled from '@emotion/styled';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TweetEditForm from './TweetEditForm';

const Container = styled.div`
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  max-width: 100%;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);

  h4 {
    font-size: 14px;
  }

  img {
    right: -10px;
    top: 20px;
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`;

const TweetActions = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  span {
    cursor: pointer;
  }

  span:first-of-type {
    margin-right: 10px;
  }
`;

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
    <Container>
      {editing && <TweetEditForm tweet={tweet} setEditing={setEditing} />}

      <h4>{tweet.text}</h4>

      {tweet.attachmentURL && <img src={tweet.attachmentURL} alt="tweetImage" />}

      {isOwner && (
        <TweetActions>
          <span onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <span onClick={onEditClick}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
        </TweetActions>
      )}
    </Container>
  );
}
