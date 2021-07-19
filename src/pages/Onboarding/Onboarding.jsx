import { Heading } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Address } from './components/Address';
import { Bvn } from './components/Bvn';
import { Layout } from './components/Layout';
import { Personal } from './components/Personal';
import { PhotoUpload } from './components/PhotoUpload';

export const Onboarding = () => {
  const [step, setStep] = useState(1);

  const renderForm = step => {
    switch (step) {
      case 1:
        return <Bvn />;
      case 2:
        return <Personal />;
      case 3:
        return <Address />;
      case 4:
        return <PhotoUpload />;

      default:
        break;
    }
  };
  return <Layout step={step}>{renderForm(step)}</Layout>;
};
