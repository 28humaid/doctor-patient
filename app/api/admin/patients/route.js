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

export async function GET(request) {
  if (!(await verifyAdminToken(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.trim() || '';
  const page  = parseInt(searchParams.get('page')  || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip  = (page - 1) * limit;

  let query = {};
  if (search) {
    query = {
      $or: [
        { name:  { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        // { 'appointments.issue': { $regex: search, $options: 'i' } },
      ],
    };
  }

  try {
    const patients = await Patient.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Patient.countDocuments(query);

    return NextResponse.json({
      success: true,
      patients,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ── POST: Create new patient (with phone)
export async function POST(request) {
  if (!(await verifyAdminToken(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const body = await request.json();
  const { name, age, gender, phone, appointments = [] } = body;

  // Validation
  if (!name || !age || !gender || !phone) {
    return NextResponse.json(
      { error: 'name, age, gender, and phone are required' },
      { status: 400 }
    );
  }

  if (!['male', 'female', 'other'].includes(gender)) {
    return NextResponse.json({ error: 'Invalid gender value' }, { status: 400 });
  }

  if (typeof age !== 'number' || age < 0) {
    return NextResponse.json({ error: 'age must be a non-negative number' }, { status: 400 });
  }

  if (!/^\d{10}$/.test(phone)) {
    return NextResponse.json({ error: 'phone must be a valid 10-digit number' }, { status: 400 });
  }

  try {
    const existing = await Patient.findOne({ phone });
    if (existing) {
      return NextResponse.json(
        { error: 'A patient with this phone number already exists', patientId: existing._id },
        { status: 409 }
      );
    }

    const newPatient = await Patient.create({
      name: name.trim(),
      age: parseInt(age),
      gender,
      phone,
      appointments: appointments.map(app => ({
        appointmentDate: new Date(app.appointmentDate),
        issue: app.issue?.trim(),
        prescription: app.prescription?.trim(),
      })).filter(app => app.appointmentDate && app.issue), // skip invalid ones
    });

    return NextResponse.json(
      { success: true, message: 'Patient created', patient: newPatient },
      { status: 201 }
    );
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Phone number already in use' }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}