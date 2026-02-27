import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, LogIn } from 'lucide-react';

const signupSchema = z
    .object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Signup Data:', data);
            reset();
            setLoading(false);
            alert('Account created successfully!');
            navigate('/login');
        }, 15000);
    };

    return (
        <div className="w-full min-h-screen p-4 flex items-center justify-center bg-slate-900 text-slate-50 font-sans" style={{ backgroundImage: 'radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%)' }}>
            <div className="w-full max-w-[420px] p-10 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-slate-800/70 backdrop-blur-md border border-white/10 animate-slideUpFade">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Create Account</h2>
                    <p className="text-slate-400 text-[0.95rem]">Sign up to get started.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-50 ml-1">Full Name</label>
                        <div className="relative flex items-center group">
                            <User className="absolute left-4 text-slate-400 pointer-events-none transition-colors duration-300 group-focus-within:text-indigo-500" size={20} />
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                {...register('name')}
                                className={`w-full py-3 pr-4 pl-12 bg-slate-900/60 border rounded-xl text-slate-50 text-[0.95rem] outline-none transition-all duration-300 focus:ring-2 placeholder:text-slate-500 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                            />
                        </div>
                        {errors.name && <span className="text-red-500 text-xs ml-1 animate-pulse">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-50 ml-1">Email</label>
                        <div className="relative flex items-center group">
                            <Mail className="absolute left-4 text-slate-400 pointer-events-none transition-colors duration-300 group-focus-within:text-indigo-500" size={20} />
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register('email')}
                                className={`w-full py-3 pr-4 pl-12 bg-slate-900/60 border rounded-xl text-slate-50 text-[0.95rem] outline-none transition-all duration-300 focus:ring-2 placeholder:text-slate-500 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                            />
                        </div>
                        {errors.email && <span className="text-red-500 text-xs ml-1 animate-pulse">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-slate-50 ml-1">Password</label>
                        <div className="relative flex items-center group">
                            <Lock className="absolute left-4 text-slate-400 pointer-events-none transition-colors duration-300 group-focus-within:text-indigo-500" size={20} />
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                className={`w-full py-3 pr-4 pl-12 bg-slate-900/60 border rounded-xl text-slate-50 text-[0.95rem] outline-none transition-all duration-300 focus:ring-2 placeholder:text-slate-500 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                            />
                        </div>
                        {errors.password && <span className="text-red-500 text-xs ml-1 animate-pulse">{errors.password.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-50 ml-1">Confirm Password</label>
                        <div className="relative flex items-center group">
                            <Lock className="absolute left-4 text-slate-400 pointer-events-none transition-colors duration-300 group-focus-within:text-indigo-500" size={20} />
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register('confirmPassword')}
                                className={`w-full py-3 pr-4 pl-12 bg-slate-900/60 border rounded-xl text-slate-50 text-[0.95rem] outline-none transition-all duration-300 focus:ring-2 placeholder:text-slate-500 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-xs ml-1 animate-pulse">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <button type="submit" className="w-full p-3.5 rounded-xl bg-indigo-500 text-white font-semibold text-base flex justify-center items-center gap-2 transition-all duration-300 mt-2 hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(99,102,241,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none" disabled={loading}>
                        {loading ? <span className="w-5 h-5 border-2 border-white/30 rounded-full border-t-white animate-spin"></span> : <><LogIn size={20} /> Sign Up</>}
                    </button>
                </form>

                <p className="text-center mt-8 text-[0.9rem] text-slate-400">
                    Already have an account? <Link to="/login" className="text-indigo-500 font-medium no-underline transition-colors duration-300 hover:underline hover:text-indigo-400">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
