"use client";
import { Box, Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DiVim } from 'react-icons/di';
import { AiTwotoneInfoCircle } from "react-icons/ai";
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

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
          {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        </Box>
        <Box maxWidth="600px">
          <Controller
            name='description'
            control={control}
            render={({ field }: any) => <SimpleMDE  {...field} placeholder="Descripcion" />} />
          {errors.description && <Text color="red" as='p'>{errors.description.message}</Text>}
        </Box>
        <Box maxWidth="600px">
          <Button>Submit Issue</Button>

        </Box>


      </form>
    </div>
  )
}

export default NewIssuePage