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

  const { patientId, appointmentId } = params;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    const initialLength = patient.appointments.length;
    patient.appointments = patient.appointments.filter(
      (app) => app._id.toString() !== appointmentId
    );

    if (patient.appointments.length === initialLength) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    await patient.save();

    return NextResponse.json({ success: true, message: 'Appointment deleted' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// UPDATE K LIYE
export async function PATCH(request, { params }) {
  if (!(await verifyAdminToken(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const { patientId, appointmentId } = params;
  const body = await request.json();
  const { prescription } = body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    const appointment = patient.appointments.id(appointmentId);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    appointment.prescription = prescription ? prescription.trim() : undefined;
    await patient.save();

    return NextResponse.json({
      success: true,
      message: 'Prescription updated',
      appointment,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}