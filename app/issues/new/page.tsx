'use client'
import { Box, Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        
	<Box maxWidth="300px">
		<TextField.Root size="2" placeholder="Title" />
	</Box>
    	<Box maxWidth="300px">
		<TextArea size="1" placeholder="Descripcion" />
	</Box>
    <Box maxWidth="300px">
        <Button>Submit Issue</Button>
    </Box>

        
        </div>
  )
}

export default NewIssuePage