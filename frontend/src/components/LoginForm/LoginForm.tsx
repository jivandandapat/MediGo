import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

import view from '../../assets/icons/view.png';
import hide from '../../assets/icons/hide.png';

export const LoginForm: React.FC = () => {

  // Added navigate hook
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      const response = await fetch(
        'http://localhost:8080/api/auth/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      // Handle login errors
      if (!response.ok) {

        if (data.message === 'User not found') {
          toast.error('Account does not exist. Please signup first.');
        }

        else if (data.message === 'Invalid password') {
          toast.error('Incorrect password');
        }

        else {
          toast.error(data.message || 'Login failed');
        }

        return;
      }

      // Store JWT token
      localStorage.setItem('token', data.token);

      // sore user name
      localStorage.setItem('user', JSON.stringify(data.user));


      // Success message
      toast.success('Login successful');

      // Role based redirect
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      }

      else if (data.user.role === 'shop_owner') {
        navigate('/shop-dashboard', { replace: true });
      }

      else {
        navigate('/user-dashboard', { replace: true });
      }

    } catch (error) {

      console.log(error);

      toast.error('Server error');

    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/80 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300">

      <h2 className="mb-6 text-center text-3xl font-extrabold text-[#1E3A8A]">
        Login
      </h2>

      <form onSubmit={submitForm} className="flex flex-col gap-4">

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Email address
          </label>

          <input
            type="email"
            value={email}
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#00A19D]/30"
          />
        </div>

        <div>

          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%&])[A-Za-z\d@#%&]{8,}$"
              title="Min 8 chars with A-Z, a-z, 0-9 and @#%&"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#00A19D]/30"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >

              <img
                src={showPassword ? hide : view}
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain opacity-70 hover:opacity-100"
              />

            </button>

          </div>

        </div>

        <div className="text-right">

          <a href="#" className="text-sm text-gray-600 hover:underline">
            Forgot password?
          </a>

        </div>

        <button
          type="submit"
          className="mt-4 w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#0052CC] to-[#007BFF] py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
        >
          Login
        </button>

      </form>

      <p className="mt-6 text-center text-sm text-gray-600">

        Don&apos;t have an account?{' '}

        <Link
          to="/signup"
          className="font-semibold text-[#0052CC] hover:underline"
        >
          Signup
        </Link>

      </p>

    </div>
  );
};