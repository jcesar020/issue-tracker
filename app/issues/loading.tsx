import { Skeleton, Table } from '@radix-ui/themes';
import React from 'react'
import IssueAction from './IssueAction';

const Loading = () => {
  const issues = [1,2,3,4,5]; // Simula una lista de issues en carga

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
          {issues.map(issues => (
            <Table.Row key={issues}>
              <Table.Cell>
                <Skeleton className='h-5 w-50' />
                </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton className='h-5 w-30' /></Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton className='h-5 w-60' /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

    </div>
  )
}

export default Loading