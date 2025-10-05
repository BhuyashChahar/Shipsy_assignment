import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/database';
import { CreateTaskRequest, TaskStatus, TaskPriority } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const user = getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '8');
    const status = searchParams.get('status') || undefined;
    const priority = searchParams.get('priority') || undefined;
    const isCompleted = searchParams.get('isCompleted') ? 
      searchParams.get('isCompleted') === 'true' : undefined;
    const search = searchParams.get('search') || undefined;
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortDirection = (searchParams.get('sortDirection') || 'desc') as 'asc' | 'desc';

    const result = db.tasks.findWithFilters(
      user.id,
      { status, priority, isCompleted, search },
      { field: sortField, direction: sortDirection },
      { page, limit }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body: CreateTaskRequest = await request.json();

    // Validate required fields
    if (!body.title || !body.status || !body.priority || body.estimatedHours === undefined) {
      return NextResponse.json(
        { error: 'Title, status, priority, and estimated hours are required' },
        { status: 400 }
      );
    }

    // Validate enum values
    if (!Object.values(TaskStatus).includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    if (!Object.values(TaskPriority).includes(body.priority)) {
      return NextResponse.json(
        { error: 'Invalid priority value' },
        { status: 400 }
      );
    }

    if (body.estimatedHours < 0) {
      return NextResponse.json(
        { error: 'Estimated hours must be non-negative' },
        { status: 400 }
      );
    }

    const task = db.tasks.create({
      title: body.title,
      status: body.status,
      priority: body.priority,
      isCompleted: false,
      estimatedHours: body.estimatedHours,
      actualHours: 0,
      description: body.description,
      userId: user.id,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
