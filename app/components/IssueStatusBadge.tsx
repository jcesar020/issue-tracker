import React from 'react'
import { Status } from '../generated/prisma'
import { Badge } from '@radix-ui/themes';

const statusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'gray' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'gray' },
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const { label, color } = statusMap[status]
    return (
    <Badge color={color}>
      {label}
    </Badge>
  )
}
 
export default IssueStatusBadge