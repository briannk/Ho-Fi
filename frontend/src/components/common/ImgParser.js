import React, { useRef } from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import parseImg from "../../utilities/parseImg";

const ImgParser = () => {
  const fileRef = useRef();

  const uploadImg = (e) => {
    console.log(e.target.files[0]);
    const image = e.target.files[0];
    parseImg(image);
  };
  return (
    <>
      <Button
        onClick={() => {
          fileRef.current.click();
        }}
      >
        <span className="mx-2">Take a Photo</span>
        <Icon name="photo" />
      </Button>
      <input
        ref={fileRef}
        type="file"
        hidden
        onChange={uploadImg}
        accept="image/png, image/jpeg"
      />
    </>
  );
};

export default ImgParser;
