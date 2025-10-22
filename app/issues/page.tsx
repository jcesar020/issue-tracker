import { prisma } from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import IssueAction from './IssueAction'

const IssuePage = async () => {
  const issues = await prisma.issue.findMany()

  await delay(2000) // Simula una carga de 2 segundos

  return (
    <div>
      <IssueAction />

      <Table.Root  variant="surface" className='mt-4'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Título</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Estado</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Creado</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="block md:hidden text-gray-500"><IssueStatusBadge status={issue.status} /></div>
                </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toLocaleDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuePage