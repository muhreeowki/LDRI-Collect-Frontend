import { Button } from '@/components/ui/button';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="mb-6 text-center">
        <h1 className="text-6xl font-bold">Welcome to the LDRI Collect App!</h1>
        <p className="mt-4 text-lg text-gray-600">
          {' '}
          The LDRI Collect App is a tool to help you collect data from the LDRI.
          Opt in to get started.
        </p>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <a href="/onboarding" className="w-full">
          <Button variant="default" className="w-full">
            Opt In
          </Button>
        </a>
      </div>
    </div>
  );
}
