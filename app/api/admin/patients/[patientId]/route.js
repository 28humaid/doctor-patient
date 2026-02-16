// app/api/admin/patients/[patientId]/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import { Patient } from '@/models/Patient';

const JWT_SECRET = process.env.JWT_SECRET;

async function verifyAdminToken(request) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function DELETE(request, { params }) {
    if (!(await verifyAdminToken(request))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    try {
        const deleted = await Patient.findByIdAndDelete(params.id);
        if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    if (!(await verifyAdminToken(request))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const body = await request.json();
    try {
        const updated = await Patient.findByIdAndUpdate(
        params.id,
        { $set: body },
        { new: true, runValidators: true }
        );
        if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true, patient: updated });
    } catch (err) {
        if (err.code === 11000) {
        return NextResponse.json({ error: 'Phone number already in use' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}