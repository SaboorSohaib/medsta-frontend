'use client';
import React, { ReactElement, useRef, useState } from 'react';
import { ImageKitProvider, IKUpload } from 'imagekitio-next';
import { Button } from './button';
import Spinner from './spinner';
import Image from 'next/image';

const ImageUploadComponent = ({
  onUploadSuccess,
  image,
}: {
  onUploadSuccess: any;
  image?: string;
}) => {
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

  const authenticator = async () => {
    try {
      const response = await fetch('/api/auth');

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const onError = (err: any) => {
    console.error('Upload Error:', err);
  };

  const onStart = () => {
    setIsLoading(true);
  };

  const onSuccess = (res: any) => {
    if (onUploadSuccess && res?.url) {
      onUploadSuccess(res?.url);
      setIsLoading(false);
    }
  };

  const ikUploadRef = useRef(null);

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className='flex flex-col gap-y-2'>
        {image && (
          <Image
            src={image}
            width={150}
            height={150}
            alt='category image'
            className='rounded-lg'
          />
        )}
        <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadStart={onStart}
          ref={ikUploadRef}
          style={{ display: 'none' }}
        />
        <Button
          type='button'
          className={`w-full ${
            isLoading && 'bg-white border border-black w-[130px]'
          }`}
          onClick={() => ikUploadRef.current.click()}
          disabled={isLoading ? true : false}
        >
          {' '}
          {isLoading ? <Spinner size='medium' /> : 'Upload Image'}
        </Button>
      </div>
    </ImageKitProvider>
  );
};

export default ImageUploadComponent;
