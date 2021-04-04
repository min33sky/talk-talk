import styled from '@emotion/styled';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthState } from 'contexts/auth';
import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  input[type='file'] {
    opacity: 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;

  input[type='text'] {
    flex-grow: 1;
    height: 40px;
    padding: 0 20px;
    color: white;
    border: 1px solid #04aaff;
    border-radius: 20px;
    font-weight: 500;
    font-size: 12px;
  }

  input[type='submit'] {
    position: absolute;
    right: 0;
    background-color: #04aaff;
    height: 40px;
    width: 40px;
    padding: 10px 0;
    text-align: center;
    border-radius: 20px;
    color: white;
  }
`;

const Label = styled.label`
  color: #04aaff;
  cursor: pointer;

  span {
    margin-right: 10px;
    font-size: 12px;
  }
`;

const Attachment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    height: 50px;
    width: 50px;
    border-radius: 40px;
  }
`;

const Clear = styled.div`
  color: #04aaff;
  cursor: pointer;
  text-align: center;

  span {
    margin-right: 10px;
    font-size: 12px;
  }
`;

export default function TweetForm() {
  const { currentUser } = useAuthState();
  const [message, setMessage] = useState(''); // Input State
  const [attachment, setAttachment] = useState<string | null>(null); // 첨부한 이미지 주소

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === '') {
      console.log('메세지를 입력하세요.');
      return;
    }

    let attachmentURL = '';

    // 1. 이미지 업로드 (업로드 이미지가 있을 경우)
    if (attachment) {
      const fileRef = storageService.ref().child(`${currentUser?.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      attachmentURL = await response.ref.getDownloadURL();
    }

    // 2. 채팅 메세지 업로드

    await dbService.collection('tweets').add({
      text: message,
      createdAt: Date.now(),
      creatorId: currentUser?.uid,
      attachmentURL,
    });

    setMessage('');
    setAttachment(null);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    const theFile = files && files[0];

    if (theFile) {
      const reader = new FileReader();
      // 리스너 등록
      reader.onloadend = (finishedEvent: ProgressEvent) => {
        const target = finishedEvent.target as FileReader;
        setAttachment(target.result as string);
      };
      // 파일 읽기
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <Form onSubmit={onSubmit}>
      <InputContainer>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={message}
          onChange={onChange}
        />
        <input type="submit" value="&rarr;" />
      </InputContainer>

      <Label htmlFor="attach-file">
        <span>Add Photo</span>
        <FontAwesomeIcon icon={faPlus} />
      </Label>

      <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} />

      {attachment && (
        <Attachment>
          <img src={attachment} alt="thumbnail" width="50px" height="50px" />
          <Clear onClick={onClearAttachment}>
            <span>clear</span>
            <FontAwesomeIcon icon={faTimes} />
          </Clear>
        </Attachment>
      )}
    </Form>
  );
}
