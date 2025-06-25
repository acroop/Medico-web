import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Layout from '../components/Layout';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const isSignUpParam = location?.state?.isSignUp || false;

  const [isLogin, setIsLogin] = useState(!isSignUpParam);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleAuth = () => {
    localStorage.setItem('@user_authenticated', 'true');
    navigate('/home');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#121212] px-4">
        <div className="w-full max-w-md p-8 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MedicoApp</h1>
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
            {isLogin
              ? 'Sign in to access your health dashboard'
              : 'Join us to start your wellness journey'}
          </p>

          <div className="space-y-4">
            {!isLogin && (
              <InputField
                value={name}
                onChangeText={setName}
                label="Full Name"
                placeholder="Enter your name"
                leftIcon="person"
              />
            )}

            <InputField
              value={email}
              onChangeText={setEmail}
              label="Email"
              placeholder="Enter your email"
              keyboardType="email"
              autoCapitalize="none"
              leftIcon="mail"
            />

            <InputField
              value={password}
              onChangeText={setPassword}
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={secureTextEntry}
              leftIcon="lock-closed"
              rightIcon={secureTextEntry ? 'eye' : 'eye-off'}
              onRightIconPress={() => setSecureTextEntry(!secureTextEntry)}
            />

            {!isLogin && (
              <InputField
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry={secureTextEntry}
                leftIcon="lock-closed"
              />
            )}

            {isLogin && (
              <div className="text-right">
                <button className="text-sm text-pink-500 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuth} />

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={toggleAuthMode}
                className="ml-1 text-pink-500 font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
