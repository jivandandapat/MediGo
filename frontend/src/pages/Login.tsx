import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { LoginForm } from '../components/LoginForm/LoginForm';

const doctorImg = '/images/doctor.png';
const logo = '/images/logo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Prevent logged-in users from going back to login page
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // already logged in → redirect to their dashboard
    if (token) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      }
      else if (user.role === 'shop_owner') {
        navigate('/shop-dashboard', { replace: true });
      }
      else {
        navigate('/user-dashboard', { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Navbar />

      <main className="flex flex-1 flex-col md:flex-row">
        {/* Left side – compact attractive layout */}
        <section className="flex flex-1 flex-col bg-gradient-to-br from-white to-slate-50 px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div className="max-w-md">

            {/* Logo row */}
            <div className="mb-4 flex items-center gap-3 md:justify-start">
              <img
                src={logo}
                alt="MediGo logo"
                className="h-12 w-12 object-contain"
              />
              <h1 className="text-3xl font-black text-[#1E3A8A]">MediGo</h1>
            </div>

            <h2 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl md:text-3xl">
              Welcome back to MediGo
            </h2>

            <p className="mb-6 text-sm text-gray-700 sm:text-base">
              MediGo simplifies medical coordination, claim processing, and patient-doctor communication in one secure platform.
            </p>

            {/* Feature bullets */}
            <ul className="mb-8 space-y-2">
              <li className="flex items-start gap-2 text-xs text-gray-700 sm:text-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#00A19D]"></span>
                Fast, secure login for patients and doctors
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-700 sm:text-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#00A19D]"></span>
                Real-time appointment and claim tracking
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-700 sm:text-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#00A19D]"></span>
                24×7 medical support and notifications
              </li>
            </ul>

            {/* Mini stats row */}
            <div className="mb-8 flex flex-wrap gap-3 text-xs">
              <div className="rounded-full bg-[#52E595]/20 px-3 py-1">
                <span className="text-sm font-bold text-[#00A19D]">10K+</span>
                <span className="block text-xs text-gray-600">Users</span>
              </div>
              <div className="rounded-full bg-[#52E595]/20 px-3 py-1">
                <span className="text-sm font-bold text-[#00A19D]">50+</span>
                <span className="block text-xs text-gray-600">Hospitals</span>
              </div>
              <div className="rounded-full bg-[#52E595]/20 px-3 py-1">
                <span className="text-sm font-bold text-[#00A19D]">24/7</span>
                <span className="block text-xs text-gray-600">Support</span>
              </div>
            </div>

            {/* Image */}
            <div className="relative flex justify-center">
              <div className="absolute -z-10 h-32 w-32 rounded-full bg-[#52E595]/20 blur-xl sm:h-40 sm:w-40" />
              <img
                src={doctorImg}
                alt="Healthcare illustration"
                className="w-full max-w-xs object-contain sm:max-w-sm"
              />
            </div>

          </div>
        </section>

        {/* Right side – login form */}
        <section className="flex flex-1 items-center justify-center bg-gradient-to-br from-[#52E595] to-[#00A19D] p-6 md:p-12">
          <LoginForm />
        </section>

      </main>
    </div>
  );
};

export default Login;