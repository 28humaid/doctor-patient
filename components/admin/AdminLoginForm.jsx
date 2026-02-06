'use client';

import { useFormik } from 'formik';
import { loginValidationSchema } from '@/lib/validationSchema';
import Input from '../common/Input';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);

        try {
            const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: 'include',   // good to have (though usually default)
            });

            const data = await res.json();

            if (!res.ok) {
            setErrors({ email: data.error || 'Invalid credentials' });
            return;
            }

            console.log('Login successful — navigating client-side');

            // Use router.push / replace instead of window.location
            router.replace('/admin/medicine');   // or router.push('/admin/prescriptions')
            // replace() is often better here — no back-button to login page

        } catch (err) {
            setErrors({ email: 'Something went wrong — try again' });
        } finally {
            setSubmitting(false);
        }
    },
  });

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Portal
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage things!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 flex flex-col justify-between min-h-[300px]">
            
            <Input
            label="Email address"
            name="email"
            type="email"
            placeholder="admin@hospital.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            required
            autoComplete="email"
            />

            <Input
            label="Password"
            name="password"
            type="password"
            placeholder="**********"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            required
            autoComplete="current-password"
            />
            {/* BUTTON */}
            <div>
                <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`
                    w-full flex justify-center py-3 px-4 
                    border border-transparent rounded-md 
                    shadow-sm text-white font-medium
                    bg-blue-600 hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-colors duration-150
                `}
                >
                {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
            </div>

            {/* Optional links */}
            <div className="text-sm text-center text-gray-600">
                <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
                </a>
            </div>
        </form>
      </div>
    </div>
  );
}