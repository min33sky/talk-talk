import { useAuthState } from 'contexts/auth';
import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TweetForm() {
  const { currentUser } = useAuthState();
  const [message, setMessage] = useState(''); // Input State
  const [attachment, setAttachment] = useState<string | null>(null); // 첨부한 이미지 주소

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
        value={message}
        onChange={onChange}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Send" />
      {attachment && (
        <>
          <img src={attachment} alt="thumbnail" width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </>
      )}
    </form>
  );
}
