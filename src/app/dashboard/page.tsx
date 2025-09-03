import React from 'react';
import UserDashboard from '@/components/user-dashboard';
import { getUserForms } from '@/actions/forms';
import { getUserDashboard } from '@/actions/users';

export default async function UserDashboardPage() {
  const [formsRes, summaryRes] = await Promise.all([
    getUserForms(),
    getUserDashboard(),
  ]);

  const forms = formsRes.success ? formsRes.forms : [];
  const summary = summaryRes.success ? summaryRes.summary : null;

  // Compute lock and aggregate server-side for better UX
  const expectedDelegates = Number(summary?._count?.Delegates ?? 0);
  const completedForms = Number(summary?._count?.FormSubmissions ?? 0);
  const isLocked = expectedDelegates > 0 && completedForms < expectedDelegates;

  // Placeholder aggregate from forms if your backend later includes scoring
  //const aggregate = null as any;

  const aggregate = forms
    ? (() => {
        const totalForms = forms.length;
        const totalScore = forms.reduce(
          (acc: any, s: any) => acc + s.totalScore,
          0
        );
        const maxScore = forms.reduce(
          (acc: any, s: any) => acc + s.maxScore,
          0
        );
        const sectionNames = [
          'Governance',
          'Finance',
          'Technical Capacity',
          'Data Infrastructure',
          'Stakeholder Engagement',
        ];

        const section1Scores = forms.reduce((acc: any, s: any) => {
          return acc + (s.section1Score || 0);
        }, 0);
        const section2Scores = forms.reduce((acc: any, s: any) => {
          return acc + (s.section2Score || 0);
        }, 0);
        const section3Scores = forms.reduce((acc: any, s: any) => {
          return acc + (s.section3Score || 0);
        }, 0);
        const section4Scores = forms.reduce((acc: any, s: any) => {
          return acc + (s.section4Score || 0);
        }, 0);
        const section5Scores = forms.reduce((acc: any, s: any) => {
          return acc + (s.section5Score || 0);
        }, 0);

        const sectionScores = [
          section1Scores,
          section2Scores,
          section3Scores,
          section4Scores,
          section5Scores,
        ];

        const sectionTotals = sectionNames.map((name: any, idx: number) => {
          return { name, score: sectionScores[idx] };
        });

        return {
          averageScore: parseFloat((totalScore / totalForms).toFixed(2)),
          totalMax: maxScore,
          sections: sectionTotals,
        };
      })()
    : (null as any);

  return (
    <UserDashboard
      submissions={forms}
      isLocked={isLocked}
      expectedDelegates={expectedDelegates}
      delegates={summary?.delegates ?? []}
      aggregate={aggregate}
    />
  );
}
