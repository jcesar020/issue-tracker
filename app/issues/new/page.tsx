'use client'
import { Box, Button,  TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        
	<Box maxWidth="600px">
		<TextField.Root size="2" placeholder="Title" />
	</Box>
    	<Box maxWidth="600px">
		<SimpleMDE placeholder="Descripcion" />
	</Box>
    <Box maxWidth="600px">
        <Button>Submit Issue</Button>
    </Box>

        
        </div>
  )
}

export default NewIssuePage