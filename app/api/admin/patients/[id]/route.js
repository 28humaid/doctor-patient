import { verifyAdminToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Patient } from "@/models/Patient";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await connectDB();

    const admin = verifyAdminToken();
    if(!admin){
        return NextResponse.json(
            {error:'Unauthorized — admin access required'},
            {status:401}
        )
    }

    const deleted = await Patient.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}