// app/components/MultiStepForm.tsx

'use client';

import { useState } from 'react';
import { submitBridgeForm } from '@/actions/form-submissions';
import Step1Governance, { Step1Data } from '@/components/form-steps/step1';
import Step2Finance, { Step2Data } from '@/components/form-steps/step2';
import Step3Technical, { Step3Data } from '@/components/form-steps/step3';
import Step4Infrastructure, { Step4Data } from '@/components/form-steps/step4';
import Step5Stakeholders, { Step5Data } from '@/components/form-steps/step5';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface MultiStepFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
}

const initialData: Partial<MultiStepFormData> = {
  step1: undefined,
  step2: undefined,
  step3: undefined,
  step4: undefined,
  step5: undefined,
};

const stepTitles = [
  'Governance',
  'Finance',
  'Technical Capacity',
  'Data Infrastructure',
  'Stakeholder Engagement',
  'Review & Submit',
];

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] =
    useState<Partial<MultiStepFormData>>(initialData);

  const totalSteps = stepTitles.length;
  const progress = (step / totalSteps) * 100;

  const handleNext = (stepKey: keyof MultiStepFormData, data: any) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const data = {
      ...formData.step1,
      ...formData.step2,
      ...formData.step3,
      ...formData.step4,
      ...formData.step5,
    };
    const result = await submitBridgeForm(data);

    if (result.success) {
      setStep(6);
    } else {
      alert('Submission failed: ' + result.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">BRIDGE Local Assessment</h1>

      <Progress value={progress} className="mb-4" />
      <div className="text-sm text-muted-foreground mb-6">
        Step {step} of {totalSteps}: {stepTitles[step - 1]}
      </div>

      {step === 1 && (
        <Step1Governance onNext={(data) => handleNext('step1', data)} />
      )}

      {step === 2 && (
        <Step2Finance
          defaultValues={formData.step2}
          onNext={(data) => handleNext('step2', data)}
          onBack={handleBack}
        />
      )}

      {step === 3 && (
        <Step3Technical
          defaultValues={formData.step3}
          onNext={(data) => handleNext('step3', data)}
          onBack={handleBack}
        />
      )}

      {step === 4 && (
        <Step4Infrastructure
          defaultValues={formData.step4}
          onNext={(data) => handleNext('step4', data)}
          onBack={handleBack}
        />
      )}

      {step === 5 && (
        <Step5Stakeholders
          defaultValues={formData.step5}
          onNext={(data) => handleNext('step5', data)}
          onBack={handleBack}
        />
      )}

      {step === 6 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Thank you for your time.</h2>
          <p className="text-muted-foreground">
            Your responses have been recorded successfully.
          </p>
          {/* <pre className="bg-muted p-4 rounded text-sm max-h-[300px] overflow-auto"> */}
          {/*   {JSON.stringify(formData, null, 2)} */}
          {/* </pre> */}
          <div className="flex gap-4 justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      )}
    </div>
  );
}
