import React from 'react';
import { BookOpen, CheckCircle2, Circle, Clock, ChevronRight } from 'lucide-react';
import { Card } from '../common/Card.jsx';

export const TopicDrawer = ({
  topics = [],
  activeTopicIndex = 0,
  completedTopicSlugs = [],
  onSelectTopic,
}) => {
  const completedCount = topics.filter((t) => completedTopicSlugs.includes(t.slug)).length;

  return (
    <Card className="rounded-2xl border-border-subtle bg-surface/85 p-4 sm:p-5 shadow-surface-md">
      <div className="flex items-center justify-between pb-3.5 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-400" />
          <h3 className="font-bold text-sm text-content-primary">Topics Checklist</h3>
        </div>
        <span className="text-xs font-mono text-content-muted">
          {completedCount} / {topics.length}
        </span>
      </div>

      <div className="divide-y divide-border-subtle/60 mt-2 space-y-1">
        {topics.map((topic, idx) => {
          const isActive = idx === activeTopicIndex;
          const isCompleted = completedTopicSlugs.includes(topic.slug);

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelectTopic(idx)}
              className={`
                w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-3 group
                ${
                  isActive
                    ? 'bg-violet-500/15 border border-violet-500/40 text-content-primary shadow-xs'
                    : 'hover:bg-surface-elevated/70 text-content-muted hover:text-content-primary border border-transparent'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="pt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                  ) : isActive ? (
                    <Circle className="w-4 h-4 text-violet-400 fill-violet-400/30" />
                  ) : (
                    <Circle className="w-4 h-4 text-content-subtle" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-mono text-violet-400 block font-semibold">
                    TOPIC {topic.order}
                  </span>
                  <h4
                    className={`text-xs sm:text-sm font-semibold line-clamp-1 ${
                      isActive ? 'text-white' : 'text-content-secondary group-hover:text-white'
                    }`}
                  >
                    {topic.title}
                  </h4>
                  <span className="text-[11px] text-content-subtle font-mono flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {topic.estimatedTime}
                  </span>
                </div>
              </div>

              <ChevronRight
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-violet-400 translate-x-0.5' : 'text-content-subtle group-hover:translate-x-0.5'
                }`}
              />
            </button>
          );
        })}
      </div>
    </Card>
  );
};

