'use client'
import { Box, Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller,  useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
      await axios.post('/api/issues', data)
      router.push('/issues')
    })}>

      <Box maxWidth="600px">
        <TextField.Root {...register("title")} size="2" placeholder="Title" />
      </Box>
      <Box maxWidth="600px">
        <Controller
          name='description'
          control={control}
          render={({ field }: any) => <SimpleMDE  {...field} placeholder="Descripcion" />} />

      </Box>
      <Box maxWidth="600px">
        <Button>Submit Issue</Button>
      </Box>


    </form>
  )
}

export default NewIssuePage