import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();

    const admin = await verifyAdminToken();
    if (!admin){
        return NextResponse.json(
            {error:'Unauthorized — admin access required'},
            {status:401}
        )
    }

    const patients = await Patient.find({})
      .select('name phone gender yearOfBirth appointments')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      patients.map(p => ({
        _id: p._id.toString(),
        name: p.name,
        phone: p.phone,
        gender: p.gender,
        yearOfBirth: p.yearOfBirth,
        appointments: p.appointments.map(a => ({
          ...a,
          _id: a._id.toString(),
          appointmentDate: a.appointmentDate?.toISOString(),
          createdAt: a.createdAt?.toISOString(),
        })),
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}