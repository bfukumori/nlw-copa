import Image from 'next/image';
import { GoogleLogo } from 'phosphor-react';
import logo from '../assets/logo.svg';

export default function SignIn() {
  return (
    <div className='h-screen grid place-content-center place-items-center gap-10'>
      <Image src={logo} alt='' />
      <h1 className='text-white text-3xl max-w-md text-center'>
        Faça login com sua conta Google para criar bolões!
      </h1>
      <button
        type='button'
        className='bg-red-600 rounded p-3 flex items-center gap-2 text-white font-bold hover:bg-red-700 transition'
      >
        <GoogleLogo size={24} weight='bold' />
        Entrar com conta Google
      </button>
    </div>
  );
}
