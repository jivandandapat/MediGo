import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const view = '/icons/view.png';
const hide = '/icons/hide.png';

export const SignupForm: React.FC = () => {

  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      // Frontend is sending new user details to backend to register the user
      const response = await fetch(
        'http://localhost:8080/api/auth/signup',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            name: fullname,
            email,
            password,
            role
          })
        }
      );

      // wait for response data
      const data = await response.json();

      console.log('Signup Response:', data);

      // if response data match with existing DB data
      if (!response.ok) {

        if (data.message === 'User already exists') {

          toast.error('Account already exists. Please login.');

        } else {

          toast.error(data.message || 'Signup failed');

        }

        return;
      }

      // message for successful signup
      toast.success('Signup successful');

      // store user details
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: fullname,
          email: email,
          role: role
        })
      );

      // reset form
      setFullname('');
      setEmail('');
      setPassword('');
      setRole('user');

      // redirect to login page
      setTimeout(() => {

        navigate('/login');

      }, 1500);

    } catch (error) {

      console.log('Signup Error:', error);

      toast.error('Server error');

    }
  };

  return (

    <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/80 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300">

      <h2 className="mb-6 text-center text-3xl font-extrabold text-[#1E3A8A]">
        Signup
      </h2>

      <form onSubmit={submitForm} className="flex flex-col gap-4">

        {/* Full Name */}
        <div>

          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Full name
          </label>

          <input
            type="text"
            value={fullname}
            placeholder="John Doe"
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#00A19D]/30"
          />

        </div>

        {/* Email */}
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

        {/* Password */}
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
            >

              <img
                src={showPassword ? hide : view}
                alt={showPassword ? 'Hide password' : 'Show password'}
                className="h-5 w-5 object-contain opacity-70 hover:opacity-100"
              />

            </button>

          </div>

        </div>

        {/* Role Dropdown */}
        <div>

          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#00A19D]/30"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="shop_owner">Shop Owner</option>
          </select>

        </div>

        <button
          type="submit"
          className="mt-4 w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#0052CC] to-[#007BFF] py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
        >
          Signup
        </button>

      </form>

      <p className="mt-6 text-center text-sm text-gray-600">

        Already have an account?{' '}

        <Link
          to="/login"
          className="font-semibold text-[#0052CC] hover:underline"
        >
          Login
        </Link>

      </p>

    </div>
  );
};