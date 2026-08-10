'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle 
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@xpertlink.com',
    href: 'mailto:info@xpertlink.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 312 3456789',
    href: 'tel:+923123456789',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Faisalabad, Pakistan',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: '24/7 Support Available',
    href: '#',
  },
];

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      setFormStatus('loading');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.company ? `Company: ${form.company}\n\n${form.message}` : form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Failed to send message.');
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
        return;
      }

      setFormStatus('success');
      setForm({ name: '', company: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong. Please try again.');
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-black w-full">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-black dark:text-white"
          >
            Let's Build Something
            <span className="text-gradient block">Amazing Together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Ready to transform your business? Reach out and let's start the conversation.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-4 flex items-center gap-4 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{info.label}</p>
                      <p className="font-medium text-black dark:text-white">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 glass rounded-2xl p-6"
              >
                <h4 className="font-space font-bold mb-2 text-black dark:text-white">Connect With Us</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Follow us on social media for the latest updates and insights.
                </p>
                <div className="flex gap-3 flex-wrap">
                  {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                    <button
                      key={social}
                      className="px-4 py-2 glass rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      {social}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 glass rounded-2xl p-6"
              >
                <h4 className="font-space font-bold mb-2 text-black dark:text-white">Office Location</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Faisalabad, Pakistan
                </p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card hover className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <p className="text-sm text-red-500 bg-red-500/10 rounded-lg px-4 py-3">{errorMessage}</p>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">Full Name</label>
                      <Input placeholder="Ali Khan" value={form.name} onChange={handleChange('name')} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">Company</label>
                      <Input placeholder="Your Company" value={form.company} onChange={handleChange('company')} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">Email Address</label>
                    <Input type="email" placeholder="ali@company.com" value={form.email} onChange={handleChange('email')} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">Subject</label>
                    <Input placeholder="How can we help?" value={form.subject} onChange={handleChange('subject')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">Message</label>
                    <textarea
                      className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-h-[120px]"
                      placeholder="Tell us about your project..."
                      value={form.message}
                      onChange={handleChange('message')}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={formStatus === 'loading'}>
                    {formStatus === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Message Sent!
                      </>
                    ) : formStatus === 'error' ? (
                      <>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Error Sending
                      </>
                    ) : formStatus === 'loading' ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}