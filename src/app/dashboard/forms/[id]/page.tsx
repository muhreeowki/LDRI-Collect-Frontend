import { getFormById } from '@/actions/form-submissions';

export default async function FormDetailPage({ params }: { params: { id: string } }) {
  const res = await getFormById(params.id);
  if (!res.success) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Form</h1>
        <p className="text-muted-foreground">Failed to load form.</p>
      </div>
    );
  }
  const form = res.form;

  const answers = Object.entries(form)
    .filter(([key]) => key.startsWith('Q_'))
    .map(([key, value]) => ({ key, value }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Form {form.id.slice(0, 8)}</h1>
        <p className="text-sm text-muted-foreground">Submission Code: {form.formSubmissionCode}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border p-4">
          <h2 className="font-semibold mb-2">Delegate</h2>
          <div className="text-sm space-y-1">
            <div><span className="text-muted-foreground">Name:</span> {form.delegate?.name}</div>
            <div><span className="text-muted-foreground">Email:</span> {form.delegate?.email}</div>
            <div><span className="text-muted-foreground">Department:</span> {form.delegate?.department}</div>
            <div><span className="text-muted-foreground">County:</span> {form.delegate?.county}</div>
          </div>
        </div>
        <div className="rounded border p-4">
          <h2 className="font-semibold mb-2">Score</h2>
          {form.score ? (
            <div className="text-sm space-y-1">
              <div>Section 1: {form.score.section1}</div>
              <div>Section 2: {form.score.section2}</div>
              <div>Section 3: {form.score.section3}</div>
              <div>Section 4: {form.score.section4}</div>
              <div>Section 5: {form.score.section5}</div>
              <div className="font-semibold">Total: {form.score.total}</div>
            </div>
          ) : (
            <p className="text-muted-foreground">No score yet.</p>
          )}
        </div>
      </div>

      <div className="rounded border p-4">
        <h2 className="font-semibold mb-3">Answers</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          {answers.map((a) => (
            <div key={a.key} className="flex items-start gap-2">
              <div className="font-mono text-xs bg-muted px-2 py-1 rounded">{a.key}</div>
              <div>{String(a.value)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
