"use client"
import styles from './styles.module.css';
import Link from "next/link";
import { LoginDialog } from "../components/login-dialog";
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { useSearchParams } from 'next/navigation';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export default function IndexPage() {
  const { data: session } = useSession()
  const params = useSearchParams()
  const error = params.get("error")

  const getErrorMessage = () => {
    const errors = {
      Signin: "Try signing with a different account.",
      OAuthSignin: "Try signing with a different account.",
      OAuthCallback: "Try signing with a different account.",
      OAuthCreateAccount: "Try signing with a different account.",
      EmailCreateAccount: "Try signing with a different account.",
      Callback: "Try signing with a different account.",
      OAuthAccountNotLinked:
        "To confirm your identity, sign in with the same account you used originally.",
      EmailSignin: "Check your email address.",
      CredentialsSignin:
        "Sign in failed. Check the details you provided are correct.",
      default: "Unable to sign in.",
    };
    const errorMessage = error && (errors[error] ?? errors.default);
    return errorMessage
  }

  if (session && session.user) {
    return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 justify-center">
        <div className="flex flex-col items-center justify-center mt-24">
          <h1 className='lg:flex lg:flex-row leading-tight lg:leading-normal'>
            <span className={`${styles['heading-line']} ${styles['heading-line-first']}`}>
              <span className={`${styles['heading-line-gradient']}`}>Arrange.</span>
            </span>
            <span className={`${styles['heading-line']} ${styles['heading-line-second']}`}>
              <span className={`${styles['heading-line-gradient']}`}>Draw.</span>
            </span>
            <span className={`${styles['heading-line']} ${styles['heading-line-third']}`}>
              <span className={`${styles['heading-line-gradient']}`}>Review.</span>
            </span>
          </h1>
          <div className="w-3/4">
            <p className="text-2xl text-zinc-400 text-center mt-5 mb-5">Prize Hub is the ultimate platform for managing doorprize events and helping you allocate exciting rewards to lucky winners with ease</p>
          </div>
          <Link href={'/dashboard'}>
            <Button className="text-lg font-semibold">Go to dashboard</Button>
          </Link>
        </div>
      </section>
    )
  } else {
    return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 justify-center">
        <div className="flex flex-col items-center justify-center mt-24">
          <h1 className='lg:flex lg:flex-row leading-tight lg:leading-normal'>
            <span className={`${styles['heading-line']} ${styles['heading-line-first']}`}>
              <span className={`${styles['heading-line-gradient']}`}>Arrange.</span>
            </span>
            <span className={`${styles['heading-line']} ${styles['heading-line-second']}`}>
              <span className={`${styles['heading-line-gradient']}`}>Draw.</span>
            </span>
            <span className={`${styles['heading-line']} ${styles['heading-line-third']}`}>
              <span className={`${styles['heading-line-gradient']}`}>Review.</span>
            </span>
          </h1>
          <div className="w-3/4">
            <p className="text-2xl text-zinc-400 text-center mt-5 mb-5">Prize Hub is the ultimate platform for managing doorprize events and helping you allocate exciting rewards to lucky winners with ease</p>
          </div>
          <LoginDialog></LoginDialog>
        </div>
        {
          error && (
            <ToastProvider duration={10000}>
              <Toast>
                <ToastTitle>
                  <p className="text-lg font-bold">Sign in error</p>
                  <ToastDescription>{getErrorMessage()}</ToastDescription>
                </ToastTitle>
                <ToastClose />
              </Toast>
              <ToastViewport />
            </ToastProvider>
          )
        }

      </section>
    )
  }
}
