import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuePage = () => {
  return (
    <div><Link href="/issues/new"><Button>Crear Issue</Button></Link></div>
  )
}

export default IssuePage