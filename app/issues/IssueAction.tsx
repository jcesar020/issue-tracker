import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueAction = () => {
  return (
    <Link href="/issues/new"><Button>Crear Issue</Button></Link>
  )
}

export default IssueAction