import React from 'react';
import { ResetPassword } from '@/components/component/reset-password';
import NotLoggedIn from '@/components/component/NotLoggedIn';

const page = () => {
  return (
    <NotLoggedIn>
      <ResetPassword />
    </NotLoggedIn>
  );
}

export default page