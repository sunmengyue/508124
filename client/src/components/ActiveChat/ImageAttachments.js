import React from 'react'
import { Box } from "@material-ui/core";

const ImageAttachments = (props) => {
  const { attachments } = props;
  return (
    <Box>
        {attachments.map(url => <img src={url} height={50} width={70} key={url}/>)}
    </Box>
  )
}

export default ImageAttachments;
