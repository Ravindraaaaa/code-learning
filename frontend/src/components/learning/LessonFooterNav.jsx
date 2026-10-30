import React from 'react';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const LessonFooterNav = ({
  activeTopicIndex = 0,
  totalTopicsCount = 0,
  onPreviousTopic,
  onNextTopic,
  onCompleteModule,
}) => {
  const isFirst = activeTopicIndex === 0;
  const isLast = activeTopicIndex >= totalTopicsCount - 1;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousTopic}
        disabled={isFirst}
        className="text-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
        <span>Previous Topic</span>
      </Button>

      <span className="text-xs font-mono text-content-muted">
        Topic {activeTopicIndex + 1} of {totalTopicsCount}
      </span>

      {!isLast ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onNextTopic}
          className="text-xs"
        >
          <span>Next Topic</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          onClick={onCompleteModule}
          className="text-xs"
        >
          <span>Complete Module & Return</span>
          <Award className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      )}
    </div>
  );
};

