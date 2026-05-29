import React from 'react';
const doctorImg = '/images/doctor.png';

export const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-1 flex-col bg-gray-50 px-4 py-10 sm:px-6 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-20 lg:py-16">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center lg:mx-0 lg:items-start lg:text-left">
          <h1 className="text-2xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Your partner for customised <span className="text-[#00A19D]">TPA</span>{' '}
            solutions worldwide
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg">
            Streamlining medical services, claim processing, and global provider
            connectivity.
          </p>

          <button className="cursor-pointer rounded-full bg-gradient-to-r from-[#00A19D] to-[#00E5BC] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:px-8 sm:py-3.5">
            Our Services
          </button>
        </div>

        <div className="relative mt-10 flex w-full justify-center lg:mt-0 lg:w-auto">
          <div className="absolute -z-10 h-56 w-56 rounded-full bg-[#52E595]/20 blur-2xl sm:h-72 sm:w-72" />

          <img
            src={doctorImg}
            alt="TPA solutions illustration"
            className="w-full max-w-[250px] object-contain transition-transform duration-300 hover:scale-105 sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 gap-6 bg-white px-6 py-14 text-center sm:grid-cols-3">
        <div>
          <h2 className="text-3xl font-bold text-[#00A19D]">10K+</h2>
          <p className="text-gray-600">Active Users</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#00A19D]">50+</h2>
          <p className="text-gray-600">Partner Hospitals</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#00A19D]">24/7</h2>
          <p className="text-gray-600">Medical Support</p>
        </div>
      </section>
    </>
  );
};