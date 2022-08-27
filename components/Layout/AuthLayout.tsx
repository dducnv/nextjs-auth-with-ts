import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuth } from '../../hooks/use-auth';

export interface IAuthLayoutProps {
  children:any;
}

export default function AuthLayout ({children}: IAuthLayoutProps) {
  const router = useRouter();
  const {profile, fistLoading} = useAuth();
  React.useEffect(()=>{
    if(!fistLoading && !profile) router.push('/')
  },[router,profile,fistLoading])
  if(!profile) return <p>Loading</p>
  return (<>{children}</>);
}
