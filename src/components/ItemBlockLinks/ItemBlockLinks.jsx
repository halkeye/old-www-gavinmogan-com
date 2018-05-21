import React from "react";
import { Button } from "react-md";

export default function({ url, type, attachments }) {
  if (url[0] === "." && attachments && attachments.length) {
    const attachment = attachments.find(att =>
      att.absolutePath.endsWith(url.replace(/^\./, ""))
    );
    if (attachment) {
      // eslint-disable-next-line no-param-reassign
      url = attachment.publicURL;
    }
  }
  return (
    <Button flat key={type} target="blank" href={url}>
      {type}
    </Button>
  );
}
