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

export async function POST(request, { params }) {
  if (!(await verifyAdminToken(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const { patientId } = params;
  const body = await request.json();

  const { appointmentDate, issue, prescription } = body;

  if (!appointmentDate || !issue) {
    return NextResponse.json(
      { error: 'appointmentDate and issue are required' },
      { status: 400 }
    );
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    const newAppointment = {
      appointmentDate: new Date(appointmentDate),
      issue: issue.trim(),
      prescription: prescription ? prescription.trim() : undefined,
    };

    patient.appointments.push(newAppointment);
    await patient.save();

    // Return the newly created appointment (with _id)
    const created = patient.appointments[patient.appointments.length - 1];

    return NextResponse.json({
      success: true,
      message: 'Appointment added',
      appointment: created,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}