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
      <div className="flex flex-row items-center justify-center w-full gap-5">
        <form action="/onboarding">
          <Button type="submit" variant="default">
            Opt In
          </Button>
        </form>
        <form action="/login">
          <Button type="submit" variant="outline">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
