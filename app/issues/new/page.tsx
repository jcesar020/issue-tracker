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
import Spinner from '@/app/components/Spinner';
import { on } from 'events';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
        try {
          setIsSubmitting(true)
          await axios.post('/api/issues', data)
          router.push('/issues')

        } catch (error) {
          setIsSubmitting(false)
          console.error(error)
          setError('Something went wrong')
        }
      })

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

      <form className='max-w-xl space-y-3' onSubmit={onSubmit}>

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
          <Button 
            disabled={isSubmitting}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Submit Issue
            {isSubmitting && <Spinner />}</Button>

        </Box>
  

      </form>
    </div>
  )
}

export default NewIssuePage