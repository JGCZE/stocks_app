"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { onFetch } from '../page'

export const ClientComponent = () => {
  return (
    <div>ClientComponent
      <Button onClick={onFetch}>Fetch</Button>
    </div>
  )
}
