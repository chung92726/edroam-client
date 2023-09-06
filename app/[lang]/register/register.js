'use client';

import { useState, useEffect, useContext } from 'react';
import { Context } from '@/context/index';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Footer from '@/components/Footer';

const Register = ({ register, footer, allCat }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [promotion, setPromotion] = useState(true);
  const [loading, setLoading] = useState(false);
  //   const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter();

  // global state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user !== null) router.push('/user');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password })
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
        promotion,
      });
      toast.success(`${register.RegSuccess}`);
      setName('');
      setEmail('');
      setPassword('');
      setLoading(false);
      router.push('/login');
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      {/* <ToastContainer position='top-center' /> */}

      <div className='mt-10 h-[82vh]'>
        <form
          onSubmit={handleSubmit}
          className='justify-center items-center form-control max-sm:mx-5'
        >
          <div className='w-full max-w-sm my-2 flex flex-col'>
            <h2 className='text-[20px] font-bold mx-2 my-2 '>
              {register.Title}
            </h2>
            <p className='mx-2 text-gray-400'>{register.Subtitle}</p>
          </div>
          <div className='grid grid-cols-2 gap-6 w-full max-w-sm'>
            <a href='/api/auth/facebook' className='w-full max-w-sm'>
              <FacebookLoginButton
                className='w-full my-3 font-bold'
                style={{
                  fontSize: '14px',

                  borderRadius: '5px',
                  boxShadow: 'rgba(0, 0, 0, 0.8) 2px 2px 5px',
                }}
              >
                <span>Facebook</span>
              </FacebookLoginButton>
            </a>
            <a href='/api/auth/google' className='w-full max-w-sm'>
              <GoogleLoginButton
                className='w-12  my-3 font-bold'
                style={{
                  fontSize: '14px',
                  borderRadius: '5px',
                  boxShadow: 'rgba(0, 0, 0, 0.8) 2px 2px 5px',
                }}
              >
                <span>Google</span>
              </GoogleLoginButton>
            </a>
          </div>

          <div className='relative w-full max-w-sm my-3'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t-2 border-base-300' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                {register.Continue}
              </span>
            </div>
          </div>
          <input
            type='text'
            placeholder={register.PlaceholderName}
            alt='name'
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='email'
            alt='email'
            placeholder={register.PlaceholderEmail}
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            alt='password'
            placeholder={register.PlaceholderPw}
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className='label cursor-pointer w-full max-w-sm'>
            <input
              type='checkbox'
              checked={promotion}
              className='checkbox mx-1'
              onChange={(e) => setPromotion(e.target.checked)}
            />
            <span className='label-text mx-1'>{register.Send_Offers}</span>
          </label>

          {/* <input
            type='password'
            placeholder='Confirm Password'
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        /> */}
          <button
            type='submit'
            className='btn mt-4 w-full max-w-sm btn-neutral'
            disabled={!name || !email || !password || loading}
          >
            {loading ? (
              <span className='loading loading-spinner loading-md'></span>
            ) : (
              [`${register.PlaceholderRegister}`]
            )}
          </button>
          <div className='w-full max-w-sm my-3'>
            <div className='flex flex-wrap mx-2 items-center'>
              <p className='text-[12px]'>{register.Agree}</p>&nbsp;
              <Link href='/terms' className='text-[12px] link link-primary'>
                {register.Terms}
              </Link>
              &nbsp;
              <Link href='/privacy' className='text-[12px] link link-primary'>
                {register.Privacy}
              </Link>
              &nbsp;
              <p className='text-[12px]'>{register.And}</p>&nbsp;
              <Link href='/cookies' className='text-[12px] link link-primary'>
                {register.Cookies}
              </Link>
            </div>
            <p className='text-center text-[14px] my-2'>
              {register.Have_Acc}{' '}
              <Link href='/login' className='link link-primary'>
                {register.Login}
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer footer={footer} allCat={allCat} />
    </>
  );
};

export default Register;
