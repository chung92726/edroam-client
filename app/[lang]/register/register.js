'use client';

import { useState, useEffect, useContext } from 'react';
import { Context } from '@/context/index';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = ({ register }) => {
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

      <div className='mt-10'>
        <form
          onSubmit={handleSubmit}
          className='justify-center items-center form-control'
        >
          <div className='w-full max-w-sm my-2 flex'>
            <h2 className='text-base font-bold mx-2'>{register.Title}</h2>
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
            <p className='mx-2 text-[12px]'>{register.T_C}</p>
            <p className='text-center text-[14px] my-2'>
              {register.Have_Acc}{' '}
              <Link href='/login' className='link link-primary'>
                {register.Login}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
