'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(
  () => import('@/components/Parallax/SmoothScroll'),
  {
    ssr: false,
  }
);

interface FormData {
  email: string;
  message: string;
}

const Contact: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      message: '',
    },
  });

  const [buttonState, setButtonState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const onSubmit = async (data: FormData) => {
    setButtonState('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setButtonState('success');
        reset();
        setTimeout(() => setButtonState('idle'), 2000);
      } else {
        throw new Error(result.details || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setButtonState('error');
      setTimeout(() => setButtonState('idle'), 2000);
    }
  };

  const getButtonContent = () => {
    const baseClasses =
      'absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200';

    return (
      <>
        <span
          className={`${baseClasses} ${buttonState === 'idle' ? 'opacity-100' : 'opacity-0'}`}
        >
          Send Message
        </span>

        <span
          className={`${baseClasses} ${buttonState === 'loading' ? 'opacity-100' : 'opacity-0'}`}
        >
          <Loader2 className="h-5 w-5 animate-spin" />
          Sending...
        </span>

        <span
          className={`${baseClasses} ${buttonState === 'success' ? 'opacity-100' : 'opacity-0'}`}
        >
          <CheckCircle2 className="h-5 w-5" />
          Sent!
        </span>

        <span
          className={`${baseClasses} ${buttonState === 'error' ? 'opacity-100' : 'opacity-0'}`}
        >
          <XCircle className="h-5 w-5" />
          Failed
        </span>
      </>
    );
  };

  return (
    <SmoothScroll>
      <main className="h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-16 h-full flex flex-col items-center">
          <div className="pt-10 bg-foreground-transparent rounded-3xl shadow-[0_10px_15px_rgba(0,0,0,0.5)] h-fit">
            <h1 className="text-4xl px-20 text-center font-theme mb-12 text-foreground">
              Reach Me
            </h1>
            <form
              className="bg-foreground-transparent rounded-b-3xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-6 p-6">
                <div>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full font-bold px-4 py-2 bg-transparent border-b-2 border-dim focus:border-b-4 focus:border-destructive rounded-none focus:outline-none transition-all placeholder:text-dim ${
                      errors.email ? 'border-destructive' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="py-1 text-sm font-bold text-destructive text-center bg-background-transparent rounded-b">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                    placeholder="Leave a message :)"
                    rows={4}
                    className={`w-full font-bold px-4 py-2 bg-transparent border-2 border-dim focus:border-4 focus:border-destructive focus:outline-none transition-all placeholder:text-dim ${
                      errors.message
                        ? 'border-destructive rounded-t'
                        : 'rounded-md'
                    }`}
                  />
                  {errors.message && (
                    <p className="-mt-2 py-1 text-sm font-bold text-destructive text-center bg-background-transparent rounded-b">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-background-transparent rounded-b-3xl space-y-6 py-6">
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={buttonState !== 'idle'}
                    className={`
                      flex px-24 rounded-2xl font-black relative h-12
                      transition-all duration-300
                      text-foreground
                      ${
                        buttonState === 'idle'
                          ? 'bg-destructive hover:scale-105'
                          : buttonState === 'loading'
                            ? 'bg-foreground-transparent cursor-not-allowed'
                            : buttonState === 'success'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                      }
                    `}
                  >
                    {getButtonContent()}
                  </button>
                </div>
                <div className="flex justify-center items-center space-x-6">
                  <a href="https://www.linkedin.com/in/jjzee/" target="_blank">
                    <svg
                      viewBox="0 0 448 512"
                      className="w-6 h-6 text-foreground hover:text-destructive fill-current"
                    >
                      <path
                        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 
                      32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 
                      96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 
                      27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                      />
                    </svg>
                  </a>
                  <a href="https://github.com/jaayzee" target="_blank">
                    <svg
                      viewBox="0 0 448 512"
                      className="w-6 h-6 text-foreground hover:text-destructive fill-current"
                    >
                      <path
                        d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 
                      415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 
                      1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 
                      22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 
                      11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 
                      36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 
                      158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 
                      1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 
                      3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 
                      2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 
                      1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z"
                      />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/jozhoooo" target="_blank">
                    <svg
                      viewBox="0 0 448 512"
                      className="w-6 h-6 text-foreground hover:text-destructive fill-current"
                    >
                      <path
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 
                      189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 
                      26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 
                      0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 
                      36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 
                      388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 
                      9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://steamcommunity.com/id/beloooga/"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 448 512"
                      className="w-6 h-6 text-foreground hover:text-destructive fill-current"
                    >
                      <path
                        d="M185.2 356.5c7.7-18.5-1-39.7-19.6-47.4l-29.5-12.2c11.4-4.3 24.3-4.5 36.4.5 12.2 5.1 21.6 14.6 26.7 26.7 5 
                      12.2 5 25.6-.1 37.7-10.5 25.1-39.4 37-64.6 26.5-11.6-4.8-20.4-13.6-25.4-24.2l28.5 11.8c18.6 7.8 39.9-.9 47.6-19.4zM400 
                      32H48C21.5 32 0 53.5 0 80v160.7l116.6 48.1c12-8.2 26.2-12.1 40.7-11.3l55.4-80.2v-1.1c0-48.2 39.3-87.5 87.6-87.5s87.6 39.3 
                      87.6 87.5c0 49.2-40.9 88.7-89.6 87.5l-79 56.3c1.6 38.5-29.1 68.8-65.7 68.8-31.8 0-58.5-22.7-64.5-52.7L0 319.2V432c0 26.5 21.5 
                      48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-99.7 222.5c-32.2 0-58.4-26.1-58.4-58.3s26.2-58.3 58.4-58.3 58.4 
                      26.2 58.4 58.3-26.2 58.3-58.4 58.3zm.1-14.6c24.2 0 43.9-19.6 43.9-43.8 0-24.2-19.6-43.8-43.9-43.8-24.2 0-43.9 19.6-43.9 43.8 
                      0 24.2 19.7 43.8 43.9 43.8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
};

export default Contact;
