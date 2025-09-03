'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface Section {
  sectionName: string;
  questions: Question[];
}

interface AssessmentAnswersProps {
  questionsBySection: Section[];
}

export function AssessmentAnswers({
  questionsBySection,
}: AssessmentAnswersProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionName: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight mb-1">
          All Assessment Answers
        </h2>
        <p className="text-muted-foreground mb-4">
          Click on a section to expand.
        </p>
      </div>
      <div className="space-y-4">
        {questionsBySection.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <Collapsible
              open={openSections[section.sectionName]}
              onOpenChange={() => toggleSection(section.sectionName)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {section.sectionName}
                      </CardTitle>
                      <CardDescription>
                        {section.questions.length} questions • Section{' '}
                        {sectionIndex + 1}
                      </CardDescription>
                    </div>
                    {openSections[section.sectionName] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {section.questions.map((question, questionIndex) => (
                      <div
                        key={question.id}
                        className="border-l-2 border-muted pl-4 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {question.id}
                          </Badge>
                          <p className="text-sm font-medium text-muted-foreground">
                            {question.question}
                          </p>
                        </div>
                        <p className="text-sm bg-muted/50 p-3 rounded-md leading-relaxed">
                          {question.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
}
