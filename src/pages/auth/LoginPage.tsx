import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import loginImg from "../../assets/login.png";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* LEFT VISUAL */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 relative"
      >
        <img
          src={loginImg}
          alt="workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-700/80" />

        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col justify-between text-white">
          <div>
            <h1 className="text-3xl font-bold">Project Vault</h1>
            <p className="mt-3 text-sm text-gray-300 max-w-md">
              A centralized system to manage internal projects, environments,
              access & infrastructure — all in one place.
            </p>
          </div>

          <div className="text-sm text-gray-300">
            Secure • Structured • Scalable
          </div>
        </div>
      </motion.div>

      {/* RIGHT FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-bold">Welcome back 👋</h2>
          <p className="text-sm text-gray-500 mt-1">
            Login to access your internal systems.
          </p>

          <form className="mt-6 space-y-4">
            <Input label="Email" type="email" placeholder="admin@company.com" />
            <Input label="Password" type="password" placeholder="••••••••" />

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 text-gray-500">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="#" className="text-gray-700 hover:underline">
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="w-full rounded-full bg-gray-900 text-white py-2.5 text-sm hover:bg-gray-800"
            >
              Login
            </motion.button>
          </form>

          <p className="mt-6 text-xs text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-gray-900 font-medium">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

/* -------- Input -------- */

const Input = ({ label, ...props }: any) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <input
      {...props}
      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm
      focus:outline-none focus:ring-2 focus:ring-gray-800"
    />
  </div>
);
