'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { AuthLayout, AuthInput, AuthButton, SuccessAnimation } from '@/components/auth';

function LockIllustration() {
  return (
    <div className="relative w-20 h-20">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl"
      />
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
        <Lock className="w-9 h-9 text-white" />
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sent) return;
    const timeout = setTimeout(
      () => router.push(`/verify-otp?email=${encodeURIComponent(email)}&purpose=reset`),
      1600
    );
    return () => clearTimeout(timeout);
  }, [sent, router, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong.');
        return;
      }

      setSent(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Forgot Password?">
        <SuccessAnimation
          title="Verification code sent successfully"
          subtitle="Redirecting you to enter the code…"
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={<LockIllustration />}
      title="Forgot Password?"
      subtitle="Enter your email address. We'll send you a secure verification code."
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={Mail}
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          error={error}
        />

        <AuthButton type="submit" loading={loading} className="mt-1">
          Send Verification Code
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
