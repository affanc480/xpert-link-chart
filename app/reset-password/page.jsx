'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AuthLayout,
  PasswordInput,
  PasswordStrength,
  getPasswordRules,
  AuthButton,
  SuccessAnimation,
} from '@/components/auth';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const otp = searchParams.get('otp') || '';

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const timeout = setTimeout(() => router.push('/login'), 1800);
    return () => clearTimeout(timeout);
  }, [done, router]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const nextErrors = {};
    if (!getPasswordRules(form.password).every((r) => r.valid)) {
      nextErrors.password = 'Password does not meet all requirements';
    }
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }
    if (!email || !otp) {
      setServerError('Missing or expired reset link. Please start over.');
      return;
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password: form.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || 'Failed to reset password.');
        return;
      }

      setDone(true);
    } catch (err) {
      console.error(err);
      setServerError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <AuthLayout title="Create New Password">
        <SuccessAnimation
          title="Password Updated Successfully"
          subtitle="Redirecting you to login…"
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Choose a strong password for your account."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {serverError && (
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-4 py-3">{serverError}</p>
        )}

        <div>
          <PasswordInput
            id="password"
            name="password"
            label="New Password"
            placeholder="Enter new password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
          />
          <PasswordStrength password={form.password} />
        </div>

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter new password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
        />

        <AuthButton type="submit" loading={loading} className="mt-1">
          Update Password
        </AuthButton>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
