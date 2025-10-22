import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Verificar que la aplicación esté funcionando
    return NextResponse.json(
      { 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Application not responding' 
      },
      { status: 503 }
    )
  }
}