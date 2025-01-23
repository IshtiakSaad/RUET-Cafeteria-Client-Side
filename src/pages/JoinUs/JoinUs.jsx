import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import AuthContext from '../../context/AuthContext/AuthContext';

const JoinUs = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user, loading } = useContext(AuthContext); // Access user state from AuthContext

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, data.email, data.password);
        alert('Login Successful!');
      } else {
        // Register
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        // User details are automatically synced with your database via AuthProvider
        alert('Registration Successful!');
        reset();
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleSocialLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // User details are automatically synced with your database via AuthProvider
      alert('Social Login Successful!');
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex items-center justify-center py-10 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Welcome, {user.displayName || 'User'}!
          </h1>
          <p className="text-center text-gray-600 mb-4">
            You are already logged in.
          </p>
          <button
            onClick={() => alert('Already logged in!')}
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Your Name"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Your Email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              placeholder="Your Password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Or continue with:</p>
          <button
            onClick={handleSocialLogin}
            className="mt-2 w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
