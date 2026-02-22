// app/api/admin/patients/search/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();

    const admin = await verifyAdminToken();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized — admin access required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();

    if (!q || q.length < 3) {
      return NextResponse.json([]);
    }

    // Search by phone (exact or partial) or name (partial)
    const patients = await Patient.find({
      $or: [
        { phone: { $regex: q, $options: 'i' } },
        { name: { $regex: q, $options: 'i' } },
      ],
    })
      .select('name phone yearOfBirth gender')
      .limit(10)
      .lean();

    return NextResponse.json(
      patients.map(p => ({
        _id: p._id.toString(),
        name: p.name,
        phone: p.phone,
        // age: p.age,
        yearOfBirth: p.yearOfBirth,
        gender: p.gender,
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}