"use client";
import { Box, Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DiVim } from 'react-icons/di';
import { AiTwotoneInfoCircle } from "react-icons/ai";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div>
      {error && <Callout.Root color='red' className='mb-4'>
        <Callout.Icon>
          <AiTwotoneInfoCircle />
        </Callout.Icon>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>
      }






      <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data)
          router.push('/issues')

        } catch (error) {
          console.error(error)
          setError('Something went wrong')
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
    </div>
  )
}

export default NewIssuePage