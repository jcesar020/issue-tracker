"use client";
import { Box, Button, TextField } from '@radix-ui/themes'
import React from 'react'
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Controller,  useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues', data)
        router.push('/issues')
        
      } catch (error) {
        console.error(error)
      }
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