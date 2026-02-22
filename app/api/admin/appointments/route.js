// app/api/admin/appointments/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    const admin = await verifyAdminToken();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized — admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { phone, name, yearOfBirth, gender, issue, prescription } = body;

    if (!phone?.match(/^\d{10}$/)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }
    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    const currentYear = new Date().getFullYear();
       if (
         !yearOfBirth ||
         yearOfBirth < 1900 ||
         yearOfBirth > currentYear
       ) {
         return NextResponse.json(
           { error: 'Year of birth must be between 1900 and current year' },
           { status: 400 }
         );
    }
    if (!['male', 'female', 'other'].includes(gender)) {
      return NextResponse.json({ error: 'Invalid gender' }, { status: 400 });
    }
    if (!issue?.trim()) return NextResponse.json({ error: 'Issue/complaint is required' }, { status: 400 });

    // Find existing patient
    let patient = await Patient.findOne({ phone });

    const appointmentData = {
      appointmentDate: new Date(),
      issue: issue.trim(),
      prescription: prescription?.trim() || undefined,
    };

    if (patient) {
      // Existing patient → just push appointment
      patient.appointments.push(appointmentData);
      await patient.save();

      return NextResponse.json({
        success: true,
        message: 'New appointment added to existing patient',
        patientId: patient._id.toString(),
      });
    } else {
      // New patient
      patient = new Patient({
        phone,
        name: name.trim(),
        yearOfBirth,
        gender,
        appointments: [appointmentData],
      });
      await patient.save();

      return NextResponse.json({
        success: true,
        message: 'New patient created with first appointment',
        patientId: patient._id.toString(),
      });
    }
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return NextResponse.json({ error: 'phone number already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}